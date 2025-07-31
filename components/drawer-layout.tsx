// DrawerLayout.tsx
import { useState, useEffect, ReactNode } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface DrawerLayoutProps {
  direction?: "left" | "right" | "bottom";
  mode?: "overlay" | "push";
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  drawerContent: ReactNode;
}

export default function DrawerLayout({
  direction = "left", // 'left' | 'right' | 'bottom'
  mode = "overlay", // 'overlay' | 'push'
  isOpen,
  onClose,
  children,
  drawerContent,
}: DrawerLayoutProps) {
  const isHorizontal = direction === "left" || direction === "right";
  const [screenSize, setScreenSize] = useState(1024); // Default fallback
  const snapPoints = [screenSize / 3, screenSize];
  const [targetSize, setTargetSize] = useState(snapPoints[0]);

  // Handle window size on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        const newScreenSize = isHorizontal
          ? window.innerWidth
          : window.innerHeight;
        setScreenSize(newScreenSize);
        setTargetSize(newScreenSize / 3);
      };

      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);

      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, [isHorizontal]);

  const [{ size }, api] = useSpring(() => ({ size: 0 }));

  useEffect(() => {
    if (isOpen) {
      api.start({ size: targetSize });
    } else {
      api.start({ size: 0 });
    }
  }, [isOpen, targetSize]);

  const bind = useDrag(({ movement: [mx, my], last }) => {
    let delta = isHorizontal ? (direction === "left" ? mx : -mx) : -my;
    let nextSize = Math.max(0, Math.min(screenSize, targetSize + delta));
    if (last) {
      const snap = snapPoints.reduce((a, b) =>
        Math.abs(b - nextSize) < Math.abs(a - nextSize) ? b : a
      );
      setTargetSize(snap);
      if (snap === 0) onClose();
      api.start({ size: snap });
    } else {
      api.set({ size: nextSize });
    }
  });

  const drawerStyle = isHorizontal
    ? {
        width: size.to((v: number) => `${v}px`),
        height: "100%",
        top: 0,
        [direction]: 0,
      }
    : {
        height: size.to((v: number) => `${v}px`),
        width: "100%",
        left: 0,
        bottom: 0,
      };

  const contentStyle =
    mode === "push"
      ? isHorizontal
        ? {
            marginLeft: direction === "left" ? size : undefined,
            marginRight: direction === "right" ? size : undefined,
          }
        : {
            marginBottom: direction === "bottom" ? size : undefined,
          }
      : {};

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {mode === "overlay" && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => {
            setTargetSize(0);
            onClose();
          }}
        />
      )}
      <animated.div
        {...bind()}
        className="fixed bg-white z-50 shadow-md"
        style={drawerStyle}
      >
        <div className="h-full w-full overflow-auto">{drawerContent}</div>
      </animated.div>
      <animated.div
        className="relative z-0 h-full w-full transition-all"
        style={contentStyle}
      >
        {children}
      </animated.div>
    </div>
  );
}
