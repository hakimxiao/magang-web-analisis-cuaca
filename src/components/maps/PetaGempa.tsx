"use client";

import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, DivIcon } from "leaflet";
import "./PetaGempa.css"; // untuk animasi pulse

// Tipe data gempa
interface Gempa {
  Tanggal: string;
  Jam: string;
  DateTime: string;
  Coordinates: string;
  Lintang: string;
  Bujur: string;
  Magnitude: string;
  Kedalaman: string;
  Wilayah: string;
  Potensi: string;
  Dirasakan: string;
  Shakemap: string;
}

// Marker pulse custom
const pulseIcon: DivIcon = L.divIcon({
  className: "pulse-marker",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const PetaGempa: React.FC = () => {
  const [gempa, setGempa] = useState<Gempa | null>(null);
  const indonesiaCenter: LatLngExpression = [-2.5, 118];

  const hasPlayedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchGempa = async () => {
      try {
        const res = await fetch(
          "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
        );
        const data = await res.json();
        const gempaData = data.Infogempa.gempa;
        setGempa(gempaData);

        // Auto-play TTS dengan teks yang lebih ramah AI
        if (gempaData && !hasPlayedRef.current) {
          hasPlayedRef.current = true;

          // Format teks TTS
          const tanggal = gempaData.Tanggal.replace(/-/g, " ");
          const jam = gempaData.Jam.split(" ")[0]; // hilangkan WIB untuk jelas
          const wilayah = gempaData.Wilayah.replace(/[0-9]+ km/g, ""); // hilangkan angka km
          const magnitudo = gempaData.Magnitude;
          const kedalaman = gempaData.Kedalaman.replace("km", " kilometer");
          const potensi = gempaData.Potensi;

          const ttsText =
            `Gempa terkini terjadi pada tanggal ${tanggal}, pukul ${jam}. ` +
            `Wilayah pusat gempa berada di ${wilayah}. ` +
            `Magnitudo gempa adalah ${magnitudo}. ` +
            `Kedalaman gempa ${kedalaman}. ` +
            `${potensi}.`;

          try {
            const audioResp = await fetch("/api/tts-gempa", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: ttsText }),
            });

            if (audioResp.ok) {
              const audioBlob = await audioResp.blob();
              const audioUrl = URL.createObjectURL(audioBlob);

              if (audioRef.current) {
                audioRef.current.pause();
                URL.revokeObjectURL(audioRef.current.src);
              }

              audioRef.current = new Audio(audioUrl);
              audioRef.current.play();
            }
          } catch (err) {
            console.error("Gagal play TTS gempa:", err);
          }
        }
      } catch (err) {
        console.error("Gagal fetch atau play TTS gempa:", err);
      }
    };

    fetchGempa();
  }, []);

  const getCoordinates = (coords: string): LatLngExpression | null => {
    if (!coords) return null;
    const [lat, lng] = coords.split(",").map((c) => parseFloat(c.trim()));
    return [lat, lng];
  };

  return (
    <MapContainer
      center={indonesiaCenter}
      zoom={5}
      scrollWheelZoom={true}
      minZoom={3}
      maxZoom={16}
      className="w-full h-[65vh] rounded-3xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {gempa && getCoordinates(gempa.Coordinates) && (
        <>
          {/* Marker pulse */}
          <Marker position={getCoordinates(gempa.Coordinates)!} icon={pulseIcon} />

          {/* Circle radius */}
          <Circle
            center={getCoordinates(gempa.Coordinates)!}
            radius={50000}
            pathOptions={{ color: "red", fillColor: "red", fillOpacity: 0.1 }}
          />

          {/* Popup */}
          <Popup position={getCoordinates(gempa.Coordinates)!}>
            <div className="p-3 rounded-xl shadow-lg border border-red-300 bg-white/90 backdrop-blur-sm">
              <h2 className="font-bold text-red-600 text-lg mb-1">Gempa Terkini</h2>
              <p className="text-sm">
                <strong>Tanggal:</strong> {gempa.Tanggal} <br />
                <strong>Jam:</strong> {gempa.Jam} <br />
                <strong>Wilayah:</strong> {gempa.Wilayah} <br />
                <strong>Magnitudo:</strong> {gempa.Magnitude} <br />
                <strong>Kedalaman:</strong> {gempa.Kedalaman} <br />
                <strong>Potensi:</strong> {gempa.Potensi}
              </p>
            </div>
          </Popup>
        </>
      )}
    </MapContainer>
  );
};

export default PetaGempa;
