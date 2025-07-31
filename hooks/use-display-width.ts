"use client";

import { useState, useEffect } from "react";

export function useDisplayWidth() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    // Set initial width
    setWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Common breakpoints
  const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  };

  // Helper functions for responsive design
  const isMobile = width < breakpoints.md;
  const isTablet = width >= breakpoints.md && width < breakpoints.lg;
  const isDesktop = width >= breakpoints.lg;
  const isLargeDesktop = width >= breakpoints.xl;

  // Get current breakpoint
  const getCurrentBreakpoint = () => {
    if (width >= breakpoints["2xl"]) return "2xl";
    if (width >= breakpoints.xl) return "xl";
    if (width >= breakpoints.lg) return "lg";
    if (width >= breakpoints.md) return "md";
    if (width >= breakpoints.sm) return "sm";
    return "xs";
  };

  return {
    width,
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    getCurrentBreakpoint,
  };
}
