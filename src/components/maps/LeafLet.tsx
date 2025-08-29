"use client"

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, LatLngBoundsExpression } from "leaflet";

const markerIcon: L.Icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Map: React.FC = () => {
  // Koordinat Palembang dengan tipe LatLngExpression
  const palembangPosition: LatLngExpression = [-2.9761, 104.7754];

  // Batas area Palembang dengan tipe LatLngBoundsExpression
  const bounds: LatLngBoundsExpression = [
    [-3.1, 104.65], // barat daya
    [-2.85, 104.9], // timur laut
  ];

  return (

    <div className="rounded-2xl border mt-3 border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
    

      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1000px] xl:min-w-full">
          <MapContainer
      center={palembangPosition}
      zoom={13}
      className="w-full h-[310px]"
      scrollWheelZoom={false} // matikan scroll zoom
      minZoom={12}
      maxZoom={16}
      maxBounds={bounds} // batasi peta agar tidak keluar Palembang
      maxBoundsViscosity={1.0} // biar benar-benar "terkunci" dalam bounds
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={palembangPosition} icon={markerIcon}>
        <Popup>
          <b>Palembang</b>
          <br />
          Data cuaca akan ditampilkan di sini
        </Popup>
      </Marker>
      <Marker position={[-2.9561, 104.7554]} icon={markerIcon}>
        <Popup>
          <b>Lokasi Lain</b>
          <br />
          Informasi tambahan di sini.
        </Popup>
      </Marker>
    </MapContainer>
        </div>
      </div>
    </div>

    
  );
};

export default Map;