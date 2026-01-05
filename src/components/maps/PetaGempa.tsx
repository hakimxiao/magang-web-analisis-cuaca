"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, DivIcon } from "leaflet";
import "./PetaGempa.css";

// =====================
// TIPE DATA
// =====================
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

// =====================
// ICON PULSE
// =====================
const pulseIcon: DivIcon = L.divIcon({
  className: "pulse-marker",
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

const PetaGempa: React.FC = () => {
  const [gempa, setGempa] = useState<Gempa | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const indonesiaCenter: LatLngExpression = [-2.5, 118];

  const hasPlayedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // =====================
  // FETCH GEMPA
  // =====================
  useEffect(() => {
    const fetchGempa = async () => {
      const res = await fetch(
        "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json"
      );
      const data = await res.json();
      const gempaData = data.Infogempa.gempa;
      setGempa(gempaData);

      if (gempaData && !hasPlayedRef.current) {
        hasPlayedRef.current = true;

        const ttsText =
          `Gempa terkini terjadi di ${gempaData.Wilayah}. ` +
          `Magnitudo ${gempaData.Magnitude}, kedalaman ${gempaData.Kedalaman}.`;

        try {
          const audioResp = await fetch("/api/tts-gempa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: ttsText }),
          });

          if (audioResp.ok) {
            const blob = await audioResp.blob();
            const url = URL.createObjectURL(blob);
            audioRef.current = new Audio(url);
            audioRef.current.play();
          }
        } catch (e) {
          console.error("TTS gagal:", e);
        }
      }
    };

    fetchGempa();
  }, []);

  const getCoordinates = (coords: string): LatLngExpression | null => {
    if (!coords) return null;
    const [lat, lng] = coords.split(",").map((c) => parseFloat(c.trim()));
    return [lat, lng];
  };

  // =====================
  // CLOSE INFO SAAT KLIK MAP
  // =====================
  const MapClickHandler = () => {
    useMapEvents({
      click() {
        setShowInfo(false);
      },
    });
    return null;
  };

  return (
    <div className="relative">
      <MapContainer
        center={indonesiaCenter}
        zoom={5}
        minZoom={3}
        maxZoom={16}
        className="w-full h-[65vh] rounded-3xl"
      >
        <MapClickHandler />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {gempa && getCoordinates(gempa.Coordinates) && (
          <>
            <Marker
              position={getCoordinates(gempa.Coordinates)!}
              icon={pulseIcon}
              eventHandlers={{
                click: () => setShowInfo(true),
              }}
            />

            <Circle
              center={getCoordinates(gempa.Coordinates)!}
              radius={50000}
              pathOptions={{
                color: "red",
                fillColor: "red",
                fillOpacity: 0.1,
              }}
            />
          </>
        )}
      </MapContainer>

      {/* =====================
          INFO CARD RESPONSIVE
      ====================== */}
      {gempa && showInfo && (
        <div
          className="
            fixed bottom-0 left-0 right-0 z-[1000]
            md:absolute md:bottom-6 md:left-6 md:right-auto
            bg-white/95 backdrop-blur-md
            rounded-t-3xl md:rounded-2xl
            shadow-xl border border-red-300
            p-4 md:p-5
            max-h-[45vh] md:max-h-none
            overflow-y-auto
            animate-slide-up
          "
        >
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-red-600 text-lg">
              🌋 Gempa Terkini
            </h2>
            <button
              onClick={() => setShowInfo(false)}
              className="text-gray-500 text-xl"
            >
              ✕
            </button>
          </div>

          <p className="text-sm leading-relaxed">
            <strong>Tanggal:</strong> {gempa.Tanggal} <br />
            <strong>Jam:</strong> {gempa.Jam} <br />
            <strong>Wilayah:</strong> {gempa.Wilayah} <br />
            <strong>Magnitudo:</strong> {gempa.Magnitude} <br />
            <strong>Kedalaman:</strong> {gempa.Kedalaman} <br />
            <strong>Potensi:</strong> {gempa.Potensi}
          </p>
        </div>
      )}
    </div>
  );
};

export default PetaGempa;
