"use client";

import { Canvas } from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
  Stats,
} from "@react-three/drei";

import { Suspense, useRef, useEffect, useCallback, useState } from "react";

import { Search, Home, Briefcase, Wifi } from "lucide-react";
import BottomPanel from "@/components/bottom-panel";
import MusicCard from "@/components/music-card";

import { useDisplayWidth } from "@/hooks/use-display-width";

import { useFullscreen } from "@/hooks/use-fullscreen";
import ActionCard from "@/components/navigation-action-card";
import FSDCard from "@/components/fsd-card";
import FullscreenButton from "@/components/fullscreen-button";
import MapView from "@/components/map-view";
import DrawerLayout from "@/components/drawer-layout";

// Preload the 3D model
useGLTF.preload("/tesla_roadster_2020.glb");

// Custom hook for pinch to zoom
function usePinchToZoom() {
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialZoom, setInitialZoom] = useState<number | null>(null);
  const controlsRef = useRef<any>(null);

  const getDistance = (touches: TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      if (event.touches.length === 2) {
        const distance = getDistance(event.touches);

        if (distance && controlsRef.current) {
          setInitialDistance(distance);
          setInitialZoom(controlsRef.current.getDistance());
        }
      }
    },

    []
  );

  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      if (
        event.touches.length === 2 &&
        initialDistance &&
        initialZoom &&
        controlsRef.current
      ) {
        event.preventDefault();
        const currentDistance = getDistance(event.touches);

        if (currentDistance) {
          const scale = currentDistance / initialDistance;
          const newDistance = initialZoom / scale;

          // Clamp zoom distance between reasonable bounds
          const clampedDistance = Math.max(3, Math.min(15, newDistance));
          controlsRef.current.setDistance(clampedDistance);
        }
      }
    },

    [initialDistance, initialZoom]
  );

  const handleTouchEnd = useCallback(() => {
    setInitialDistance(null);
    setInitialZoom(null);
  }, []);

  useEffect(() => {
    const canvas = document.querySelector("canvas");

    if (canvas) {
      canvas.addEventListener("touchstart", handleTouchStart, {
        passive: false,
      });

      canvas.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      canvas.addEventListener("touchend", handleTouchEnd);

      return () => {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return controlsRef;
}

function TeslaCar() {
  const { scene } = useGLTF("/tesla_roadster_2020.glb");

  return (
    <group>
      {" "}
      {/* Ground Plane with Feathered Edges */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {" "}
        <planeGeometry args={[50, 50, 64, 64]} />{" "}
        <meshStandardMaterial
          color="#1a1a1a"
          transparent={true}
          opacity={0.8}
          side={2}

          // DoubleSide
        />{" "}
      </mesh>{" "}
      {/* Original Car */}
      <group rotation={[0, Math.PI / 4, 0]}>
        {" "}
        <primitive
          object={scene}
          scale={[2.5, 2.5, 2.5]}
          position={[0, 0, 0]}
        />{" "}
      </group>{" "}
      {/* Interactive Hotspots */}
      <Html position={[-0.5, 1, 3.5]} center>
        {" "}
        <div className="bg-black/80 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm border border-white/20 pointer-events-auto cursor-pointer hover:bg-black/90 transition-all">
          {" "}
          <div className="text-center">
            {" "}
            <div>Open</div> <div>Frunk</div>{" "}
          </div>{" "}
        </div>{" "}
      </Html>{" "}
      <Html position={[0.5, 1, -3.5]} center>
        {" "}
        <div className="bg-black/80 text-white px-4 py-3 rounded-xl text-sm font-medium backdrop-blur-sm border border-white/20 pointer-events-auto cursor-pointer hover:bg-black/90 transition-all">
          {" "}
          <div className="text-center">
            {" "}
            <div>Open</div> <div>Trunk</div>{" "}
          </div>{" "}
        </div>{" "}
      </Html>{" "}
      {/* Charging port indicator */}
      <Html position={[2.2, 0.5, 1]} center>
        {" "}
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>{" "}
      </Html>{" "}
      <Html position={[2.2, 0.2, 0.5]} center>
        {" "}
        <div className="text-white text-xs">⚡</div>{" "}
      </Html>{" "}
    </group>
  );
}

export default function TeslaUI() {
  const controlsRef = useRef<any>(null);
  const pinchControlsRef = usePinchToZoom();

  const { toggleFullscreen } = useFullscreen();

  const { width } = useDisplayWidth();
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(8);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;

      // Get current camera position
      const currentAzimuthalAngle = controls.getAzimuthalAngle();
      const currentPolarAngle = controls.getPolarAngle();

      // Target angles (initial position - diagonal view)
      // For position [cameraDistance, 6, cameraDistance], the angles are:
      // azimuthal: Math.PI / 4 (45 degrees) - diagonal view
      // polar: Math.atan2(Math.sqrt(cameraDistance*cameraDistance + cameraDistance*cameraDistance), 6)
      const targetAzimuthalAngle = Math.PI / 4; // 45 degrees for diagonal view
      const targetPolarAngle = Math.atan2(
        Math.sqrt(2 * cameraDistance * cameraDistance),
        6
      );

      // Animation duration in milliseconds
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        // Interpolate angles
        const newAzimuthalAngle =
          currentAzimuthalAngle +
          (targetAzimuthalAngle - currentAzimuthalAngle) * easeOutCubic;
        const newPolarAngle =
          currentPolarAngle +
          (targetPolarAngle - currentPolarAngle) * easeOutCubic;

        // Update controls
        controls.setAzimuthalAngle(newAzimuthalAngle);
        controls.setPolarAngle(newPolarAngle);
        controls.update();

        // Continue animation if not complete
        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          animationFrameRef.current = null;
        }
      };

      // Start animation
      animationFrameRef.current = requestAnimationFrame(animate);
    }
  }, [cameraDistance]);

  const startResetTimer = useCallback(() => {
    // Clear any existing timer
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    // Start a new 5-second timer
    resetTimerRef.current = setTimeout(
      () => {
        resetCamera();
      },

      5000
    );
  }, [resetCamera]);

  const stopResetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    const controls = controlsRef.current;

    if (controls) {
      const handleStart = () => {
        stopResetTimer();
        stopAnimation();
      };

      const handleEnd = () => {
        startResetTimer();
      };

      // Listen for control events
      controls.addEventListener("start", handleStart);
      controls.addEventListener("end", handleEnd);

      return () => {
        controls.removeEventListener("start", handleStart);
        controls.removeEventListener("end", handleEnd);
        stopResetTimer();
        stopAnimation();
      };
    }
  }, [startResetTimer, stopResetTimer]);

  // Initial camera reset after component mounts
  useEffect(() => {
    const timer = setTimeout(
      () => {
        resetCamera();
      },

      1000
    );

    return () => clearTimeout(timer);
  }, [resetCamera]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // F11 key for full screen toggle
      if (event.key === "F11") {
        event.preventDefault();
        toggleFullscreen();
      }

      // Escape key to exit full screen
      if (event.key === "Escape") {
        if (
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).msFullscreenElement
        ) {
          toggleFullscreen();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [toggleFullscreen]);

  const mainContent = (
    <div className="w-full h-screen bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white flex flex-col">
      {" "}
      {/* Full Screen Button */}
      <FullscreenButton /> {/* Top Status Bar */}
      <div className="absolute top-0 left-0 right-0 w-full flex-shrink-0 z-20 flex justify-between items-center px-6 py-4 text-sm">
        {" "}
        {/* Left side */}
        <div className="flex items-center gap-6">
          {" "}
          <div className="flex items-center gap-3">
            {" "}
            <span className="font-bold text-lg">PRND</span>{" "}
            <div className="flex items-center gap-2">
              {" "}
              <div className="w-10 h-4 border-2 border-white/60 rounded-sm relative">
                {" "}
                <div className="absolute inset-0.5 w-[55%] bg-white rounded-sm"></div>{" "}
              </div>{" "}
              <span className="font-medium">59%</span>{" "}
            </div>{" "}
          </div>{" "}
          <div className="w-6 h-6 text-blue-400">
            {" "}
            <Wifi className="w-full h-full" />{" "}
          </div>{" "}
        </div>{" "}
        {/* Center */}
        <div className="flex items-center gap-3">
          {" "}
          <div className="flex items-center gap-2">
            {" "}
            <div className="w-5 h-5 text-white">👤</div>{" "}
            <span className="font-medium">Easy Entry</span>{" "}
          </div>{" "}
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>{" "}
        </div>{" "}
        {/* Right side */}
        <div className="flex items-center gap-6 text-sm">
          {" "}
          <span className="font-medium">2:39 pm</span>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <span>☀️</span> <span className="font-medium">85°F</span>{" "}
          </div>{" "}
          <div className="flex items-center gap-2">
            {" "}
            <span>🚗</span>{" "}
            <span className="text-xs">
              {" "}
              PASSENGER <br /> AIRBAG OFF{" "}
            </span>{" "}
          </div>{" "}
          <button
            onClick={() => setIsMapVisible(!isMapVisible)}
            className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            {" "}
            🗺️ Map{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
      {/* Main Content Area */}
      <DrawerLayout
        direction="right"
        mode="push"
        isOpen={isMapVisible}
        onClose={() => setIsMapVisible(false)}
        drawerContent={<MapView />}
      >
        {" "}
        <div className="flex-1 w-full h-full">
          {" "}
          <Canvas
            camera={{
              position: [cameraDistance, 6, cameraDistance],
              fov: 50,
            }}
            style={{
              background: "transparent",
            }}
          >
            {" "}
            <Stats />{" "}
            <Suspense fallback={null}>
              {" "}
              <ambientLight intensity={0.4} />{" "}
              <directionalLight
                position={[10, 10, 5]}
                intensity={1.5}
                castShadow
              />{" "}
              <pointLight
                position={[-10, 5, -5]}
                intensity={1.0}
                color="#4a90e2"
              />{" "}
              <spotLight
                position={[0, 15, 0]}
                intensity={0.8}
                angle={0.3}
                penumbra={1}
              />{" "}
              <TeslaCar /> <Environment preset="sunset" />{" "}
              <OrbitControls
                ref={(ref) => {
                  controlsRef.current = ref;
                  pinchControlsRef.current = ref;
                }}
                enablePan={false}
                enableZoom={true}
                minDistance={3}
                maxDistance={15}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2.2}
                autoRotate={false}
                rotateSpeed={0.5}
                enableDamping={true}
                dampingFactor={0.05}
                target={[0, 0, 0]}
              />{" "}
            </Suspense>{" "}
          </Canvas>{" "}
          <div className="absolute bottom-5 left-5 right-5 flex flex-row gap-4 justify-center pointer-events-none">
            {" "}
            <div className="flex flex-col gap-4 items-end pointer-events-auto">
              {" "}
              <div>
                {" "}
                <FSDCard />{" "}
              </div>{" "}
              <div className="flex flex-row gap-4">
                {" "}
                <MusicCard /> <ActionCard />{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </DrawerLayout>{" "}
      {/* Bottom Panel - Fixed at bottom */}
      <div className="flex-shrink-0">
        {" "}
        <BottomPanel />{" "}
      </div>{" "}
    </div>
  );

  return (
    <DrawerLayout
      direction="right"
      mode="overlay"
      isOpen={isMapVisible}
      onClose={() => setIsMapVisible(false)}
      drawerContent={<MapView />}
    >
      {" "}
      {mainContent}
    </DrawerLayout>
  );
}
