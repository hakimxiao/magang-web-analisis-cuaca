"use client";

import { useState, useRef } from "react";

interface PlayWeatherVoiceProps {
  text: string;
}

export default function PresenterComponent({ text }: PlayWeatherVoiceProps) {
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = async () => {
    try {
      console.log("DEBUG: text sebelum kirim TTS:", text);

      setLoading(true);

      const resp = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }), // HARUS object { text }
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
    <div className="flex gap-2">
      <button
        onClick={handlePlay}
        disabled={loading || isPlaying}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Mempersiapkan suara..." : "Dengarkan Cuaca"}
      </button>

      {isPlaying && (
        <button
          onClick={handleStop}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Stop
        </button>
      )}
    </div>
  );
}
