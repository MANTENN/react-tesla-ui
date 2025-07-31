"use client";

import { MapPin, Navigation, Car } from "lucide-react";

export default function MapView() {
  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Map Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Navigation className="w-5 h-5 text-blue-400" />
            <div>
              <h2 className="font-semibold text-lg">Navigation</h2>
              <p className="text-sm text-gray-400">
                Tesla Supercharger Network
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Car className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">85%</span>
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative">
        {/* Placeholder Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
          {/* Grid pattern for map effect */}
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Current Location */}
          <div className="absolute top-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-4 h-4 bg-blue-500 rounded-full animate-ping opacity-75"></div>
              <MapPin className="absolute -bottom-1 -right-1 w-3 h-3 text-blue-400" />
            </div>
          </div>

          {/* Destination */}
          <div className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs">
              Supercharger
            </div>
          </div>

          {/* Route Line */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <path
              d="M 25% 33% Q 50% 20% 67% 75%"
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
              className="animate-pulse"
            />
          </svg>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span className="text-lg">+</span>
          </button>
          <button className="w-10 h-10 bg-black/50 hover:bg-black/70 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
            <span className="text-lg">−</span>
          </button>
        </div>

        {/* Route Info */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Destination</p>
              <p className="font-medium">Tesla Supercharger - Downtown</p>
              <p className="text-xs text-gray-500">2.3 miles • 5 min</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-green-400">85% → 92%</p>
              <p className="text-xs text-gray-500">Estimated arrival</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
