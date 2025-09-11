"use client";

import React from "react";
import { MapContainer, TileLayer, LayersControl, ScaleControl, AttributionControl } from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

export type RainMapProps = {
  center?: LatLngExpression;
  zoom?: number;
  className?: string;
  height?: string | number;
  showControls?: boolean;
};

/**
 * RainMap – Leaflet + OpenWeatherMap precipitation overlay for Next.js (TypeScript, React)
 *
 * Requirements:
 *  - npm i leaflet react-leaflet
 *  - Add NEXT_PUBLIC_OWM_KEY in .env.local
 *  - Ensure global CSS includes Leaflet styles (see app/globals.css or import here)
 */
const RainMap: React.FC<RainMapProps> = ({
  center = [-2.9909, 104.7566], // Palembang
  zoom = 10,
  className = "rounded-2xl shadow-md overflow-hidden",
  height = "70vh",
  showControls = true,
}) => {

  const owmKey = process.env.NEXT_PUBLIC_OWM_KEY;



  return (
    <div className={className} style={{ height, position: "relative" }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={showControls}
        attributionControl={false}
      >
        <AttributionControl position="bottomright" prefix="" />
        <ScaleControl position="bottomleft" />


        <LayersControl position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="
              <strong>Legenda:</strong>
              <div>🌧️ Biru = Hujan</div>
              <div>☁️ Putih/Abu = Awan</div>
              <div>🌡️ Warna gradasi = Suhu</div>
              &copy; OpenStreetMap contributors 
              "
              maxZoom={19}
            />
          </BaseLayer>

          <BaseLayer name="Carto Light">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution="
              <strong>Legenda:</strong>
              <div>🌧️ Biru = Hujan</div>
              <div>☁️ Putih/Abu = Awan</div>
              <div>🌡️ Warna gradasi = Suhu</div>
              &copy; OpenStreetMap contributors &copy; CARTO"
              maxZoom={20}
            />
          </BaseLayer>

          {/* OpenWeatherMap Overlays (free plan, model lama) */}
          <Overlay checked name="Precipitation (rain)">
            <TileLayer
              url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${owmKey}`}
              attribution="Weather layers © OpenWeatherMap"
              opacity={1}
            />
          </Overlay>

          <Overlay name="Wind (Angin)">
            <TileLayer
              url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${owmKey}`}
              attribution="Weather layers © OpenWeatherMap"
              opacity={1}
            />
          </Overlay>

          <Overlay name="Pressure (Tekanan)">
            <TileLayer
              url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${owmKey}`}
              attribution="Weather layers © OpenWeatherMap"
              opacity={1}
            />
          </Overlay>

          <Overlay name="Humidity (Kelembapan)">
            <TileLayer
              url={`https://tile.openweathermap.org/map/humidity_new/{z}/{x}/{y}.png?appid=${owmKey}`}
              attribution="Weather layers © OpenWeatherMap"
              opacity={1}
            />
          </Overlay>

          <Overlay name="Clouds">
            <TileLayer
              url={`https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${owmKey}`}
              attribution="Weather layers © OpenWeatherMap"
              opacity={1}
            />
          </Overlay>

          <Overlay name="Temperature">
            <TileLayer
              url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${owmKey}`}
              attribution="Weather layers © OpenWeatherMap"
              opacity={1}
            />
          </Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default RainMap;