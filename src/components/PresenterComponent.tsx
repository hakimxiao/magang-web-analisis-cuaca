"use client";

import { useState, useRef } from "react";
import { Volume2, Square } from "lucide-react";

interface PlayWeatherVoiceProps {
  text: string;
}

export default function PresenterComponent({ text }: PlayWeatherVoiceProps) {
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    try {
      setLoading(true);
      const resp = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error("TTS API Error:", errorText);
        setLoading(false);
        return;
      }

      const audioBlob = await resp.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);

      await audio.play();
      setIsPlaying(true);
    } catch (e) {
      console.error("HandlePlay crash:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-center gap-3 mb-3">
      <button
        onClick={handlePlay}
        disabled={loading || isPlaying}
        className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg 
                   bg-blue-500 text-white text-sm sm:text-base font-medium
                   hover:bg-blue-600 disabled:opacity-50 shadow-md transition"
      >
        {loading ? "⏳ Mempersiapkan..." : (
          <>
            <Volume2 size={18} />
            Dengarkan
          </>
        )}
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg 
                     bg-red-500 text-white text-sm sm:text-base font-medium
                     hover:bg-red-600 shadow-md transition"
        >
          <Square size={18} />
          Stop
        </button>
      )}
    </div>
  );
}
