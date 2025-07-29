"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Html } from "@react-three/drei"
import { Suspense, useState } from "react"
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Plus,
  BarChart3,
  Search,
  Phone,
  Calendar,
  Volume2,
  Home,
  Briefcase,
  Bluetooth,
  MoreHorizontal,
  Wifi,
} from "lucide-react"
import { Button } from "@/components/ui/button"

function TeslaCar() {
  return (
    <group>
      {/* Main car body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.2, 1.4, 9]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>

      {/* Car hood - more curved */}
      <mesh position={[0, 0.1, 3.5]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[4, 0.8, 2.5]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>

      {/* Car roof/cabin */}
      <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[3.8, 1.2, 5]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
      </mesh>

      {/* Windshield */}
      <mesh position={[0, 1.2, 2]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[3.6, 0.05, 2.5]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.8} metalness={0.1} roughness={0.1} />
      </mesh>

      {/* Side windows */}
      <mesh position={[1.9, 1, 0]} rotation={[0, 0, 0.1]}>
        <boxGeometry args={[0.05, 0.8, 3]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-1.9, 1, 0]} rotation={[0, 0, -0.1]}>
        <boxGeometry args={[0.05, 0.8, 3]} />
        <meshStandardMaterial color="#1a1a2e" transparent opacity={0.8} />
      </mesh>

      {/* Wheels */}
      {[
        [-1.8, -0.7, 3],
        [1.8, -0.7, 3],
        [-1.8, -0.7, -3],
        [1.8, -0.7, -3],
      ].map((pos, i) => (
        <group key={i} position={pos}>
          {/* Tire */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.8, 0.8, 0.4]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.1]}>
            <cylinderGeometry args={[0.6, 0.6, 0.3]} />
            <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Center cap */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.2]}>
            <cylinderGeometry args={[0.2, 0.2, 0.1]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>
        </group>
      ))}

      {/* Interactive Hotspots */}
      <Html position={[-2, 1, 3.5]} center>
        <div className="bg-black/80 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm border border-white/20 pointer-events-auto cursor-pointer hover:bg-black/90 transition-all">
          <div className="text-center">
            <div>Open</div>
            <div>Frunk</div>
          </div>
        </div>
      </Html>

      <Html position={[2, 1, -3.5]} center>
        <div className="bg-black/80 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm border border-white/20 pointer-events-auto cursor-pointer hover:bg-black/90 transition-all">
          <div className="text-center">
            <div>Open</div>
            <div>Trunk</div>
          </div>
        </div>
      </Html>

      {/* Charging port indicator */}
      <Html position={[2.2, 0.5, 1]} center>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      </Html>

      <Html position={[2.2, 0.2, 0.5]} center>
        <div className="text-white text-xs">⚡</div>
      </Html>
    </group>
  )
}

export default function TeslaUI() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="w-full h-screen bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 py-4 text-sm">
        {/* Left side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">PRND</span>
            <div className="flex items-center gap-2">
              <div className="w-10 h-4 border-2 border-white/60 rounded-sm relative">
                <div className="absolute inset-0.5 w-[55%] bg-white rounded-sm"></div>
              </div>
              <span className="font-medium">59%</span>
            </div>
          </div>
          <div className="w-6 h-6 text-blue-400">
            <Wifi className="w-full h-full" />
          </div>
        </div>

        {/* Center */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 text-white">👤</div>
            <span className="font-medium">Easy Entry</span>
          </div>
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 text-sm">
          <span className="font-medium">2:39 pm</span>
          <div className="flex items-center gap-2">
            <span>☀️</span>
            <span className="font-medium">85°F</span>
          </div>
          <div className="flex items-center gap-2">
            <span>🚗</span>
            <span className="text-xs">
              PASSENGER
              <br />
              AIRBAG OFF
            </span>
          </div>
        </div>
      </div>

      {/* Main 3D Car Area */}
      <div className="absolute inset-0 pt-16 pb-48">
        <Canvas camera={{ position: [12, 8, 12], fov: 45 }} style={{ background: "transparent" }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
            <pointLight position={[-10, 5, -5]} intensity={0.8} color="#4a90e2" />
            <spotLight position={[0, 15, 0]} intensity={0.5} angle={0.3} penumbra={1} />

            <TeslaCar />

            <Environment preset="night" />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.2}
              autoRotate={false}
              rotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* FSD Panel */}
      <div className="absolute bottom-60 right-8 z-10">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 text-center border border-white/10">
          <div className="text-lg font-semibold mb-2">Start FSD (Supervised)</div>
          <div className="text-sm text-gray-400 mb-4">Navigation destination required</div>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto border-2 border-white/20">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-black rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Panel */}
      <div className="absolute bottom-60 right-80 z-10">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl p-4 border border-white/10">
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-white/10">
            <Search className="w-5 h-5" />
            <span className="font-semibold text-lg">Navigate</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              <Home className="w-5 h-5" />
              <span className="font-medium">Home</span>
            </div>
            <div className="flex items-center gap-4 p-3 hover:bg-white/10 rounded-xl transition-colors cursor-pointer">
              <Briefcase className="w-5 h-5" />
              <span className="font-medium">Work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Speed Display */}
      <div className="absolute bottom-32 left-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🚗</span>
          </div>
          <span className="text-6xl font-light">70</span>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10">
        {/* Music Player */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">ALBUM</span>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg mb-1">Майбутність (feat. KALUSH)</div>
                <div className="text-gray-400 text-sm mb-2">🎵 Артем Пивоваров</div>
                <div className="w-80 h-1 bg-gray-600 rounded-full">
                  <div className="w-1/3 h-full bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-white/10">
                <SkipBack className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 hover:bg-white/10"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-white/10">
                <SkipForward className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-white/10">
                <Plus className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-white/10">
                <BarChart3 className="w-6 h-6" />
              </Button>
              <Button variant="ghost" size="icon" className="w-12 h-12 hover:bg-white/10">
                <Search className="w-6 h-6" />
              </Button>
            </div>
          </div>

          {/* App Dock and Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/30 rounded-full"></div>
            </div>

            {/* App Icons */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-xl">
                <Phone className="w-7 h-7" />
              </Button>
              <Button variant="ghost" size="icon" className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-xl">
                <Calendar className="w-7 h-7" />
              </Button>
              <Button variant="ghost" size="icon" className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-xl">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                  <span className="text-green-500 font-bold text-sm">S</span>
                </div>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 rounded-xl"
              >
                <span className="text-2xl">♪</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-14 h-14 bg-green-600 hover:bg-green-700 rounded-xl">
                <span className="text-2xl">✓</span>
              </Button>
              <Button variant="ghost" size="icon" className="w-14 h-14 bg-white/10 hover:bg-white/20 rounded-xl">
                <MoreHorizontal className="w-7 h-7" />
              </Button>
              <Button variant="ghost" size="icon" className="w-14 h-14 bg-blue-500 hover:bg-blue-600 rounded-xl">
                <Bluetooth className="w-7 h-7" />
              </Button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <Volume2 className="w-6 h-6" />
              <div className="w-20 h-1 bg-gray-600 rounded-full">
                <div className="w-3/4 h-full bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
