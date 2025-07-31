"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import {
  Car,
  Fan,
  Snowflake,
  Sun,
  Wind,
  Zap,
  Shield,
  Lock,
  Unlock,
  Settings,
  Wifi,
  Bluetooth,
  Volume2,
  VolumeX,
} from "lucide-react";

// First toggle group - Climate Control System
type ClimateMode = "auto" | "manual" | "eco" | "off";
type ClimateFeature = "ac" | "heat" | "fan" | "defrost";

interface ClimateState {
  mode: ClimateMode;
  features: ClimateFeature[];
}

// Second toggle group - Security & Connectivity
type SecurityMode = "locked" | "unlocked" | "valet";
type ConnectivityFeature = "wifi" | "bluetooth" | "cellular" | "gps";

interface SecurityState {
  mode: SecurityMode;
  features: ConnectivityFeature[];
}

export function ClimateToggleGroup() {
  const [climateState, setClimateState] = useState<ClimateState>({
    mode: "off",
    features: [],
  });

  const handleModeChange = (mode: ClimateMode) => {
    setClimateState((prev) => {
      let newFeatures = [...prev.features];

      // Auto mode controls other features
      if (mode === "auto") {
        newFeatures = ["ac", "fan"];
      } else if (mode === "eco") {
        newFeatures = ["ac"];
      } else if (mode === "manual") {
        // Keep existing features but allow manual control
        newFeatures = prev.features.length > 0 ? prev.features : ["ac"];
      } else if (mode === "off") {
        newFeatures = [];
      }

      return { mode, features: newFeatures };
    });
  };

  const handleFeatureToggle = (feature: ClimateFeature) => {
    setClimateState((prev) => {
      let newFeatures = [...prev.features];

      if (newFeatures.includes(feature)) {
        newFeatures = newFeatures.filter((f) => f !== feature);
      } else {
        newFeatures.push(feature);
      }

      // If no features are selected, turn off the system
      if (newFeatures.length === 0) {
        return { mode: "off", features: [] };
      }

      // If auto mode is active, ensure ac and fan are always on
      if (prev.mode === "auto") {
        if (!newFeatures.includes("ac")) newFeatures.push("ac");
        if (!newFeatures.includes("fan")) newFeatures.push("fan");
      }

      return { ...prev, features: newFeatures };
    });
  };

  return (
    <div className="space-y-4 p-4 bg-black/20 rounded-xl border border-white/10">
      <h3 className="text-sm font-medium text-white/80 mb-3">
        Climate Control
      </h3>

      {/* Mode Toggle Group */}
      <div className="space-y-2">
        <label className="text-xs text-white/60">Mode</label>
        <ToggleGroup
          type="single"
          value={climateState.mode}
          onValueChange={(value) =>
            value && handleModeChange(value as ClimateMode)
          }
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem
            value="off"
            className="bg-red-600/20 hover:bg-red-600/30 data-[state=on]:bg-red-600/40 border-red-500/30"
          >
            <Car className="w-4 h-4" />
            <span className="text-xs">Off</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="auto"
            className="bg-blue-600/20 hover:bg-blue-600/30 data-[state=on]:bg-blue-600/40 border-blue-500/30"
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs">Auto</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="manual"
            className="bg-yellow-600/20 hover:bg-yellow-600/30 data-[state=on]:bg-yellow-600/40 border-yellow-500/30"
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs">Manual</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="eco"
            className="bg-green-600/20 hover:bg-green-600/30 data-[state=on]:bg-green-600/40 border-green-500/30"
          >
            <Shield className="w-4 h-4" />
            <span className="text-xs">Eco</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Features Toggle Group */}
      <div className="space-y-2">
        <label className="text-xs text-white/60">Features</label>
        <ToggleGroup
          type="multiple"
          value={climateState.features}
          onValueChange={(values) => {
            values.forEach((value) => {
              if (!climateState.features.includes(value as ClimateFeature)) {
                handleFeatureToggle(value as ClimateFeature);
              }
            });
            climateState.features.forEach((feature) => {
              if (!values.includes(feature)) {
                handleFeatureToggle(feature);
              }
            });
          }}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem
            value="ac"
            disabled={climateState.mode === "auto"}
            className="bg-cyan-600/20 hover:bg-cyan-600/30 data-[state=on]:bg-cyan-600/40 border-cyan-500/30 disabled:opacity-50"
          >
            <Snowflake className="w-4 h-4" />
            <span className="text-xs">AC</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="heat"
            className="bg-orange-600/20 hover:bg-orange-600/30 data-[state=on]:bg-orange-600/40 border-orange-500/30"
          >
            <Sun className="w-4 h-4" />
            <span className="text-xs">Heat</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="fan"
            disabled={climateState.mode === "auto"}
            className="bg-gray-600/20 hover:bg-gray-600/30 data-[state=on]:bg-gray-600/40 border-gray-500/30 disabled:opacity-50"
          >
            <Fan className="w-4 h-4" />
            <span className="text-xs">Fan</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="defrost"
            className="bg-white/20 hover:bg-white/30 data-[state=on]:bg-white/40 border-white/30"
          >
            <Wind className="w-4 h-4" />
            <span className="text-xs">Defrost</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Status Display */}
      <div className="text-xs text-white/60 mt-3">
        <div>
          Mode: <span className="text-white">{climateState.mode}</span>
        </div>
        <div>
          Features:{" "}
          <span className="text-white">
            {climateState.features.join(", ") || "none"}
          </span>
        </div>
      </div>
    </div>
  );
}

export function SecurityToggleGroup() {
  const [securityState, setSecurityState] = useState<SecurityState>({
    mode: "locked",
    features: ["wifi", "bluetooth"],
  });

  const handleModeChange = (mode: SecurityMode) => {
    setSecurityState((prev) => {
      let newFeatures = [...prev.features];

      // Locked mode controls connectivity features
      if (mode === "locked") {
        // Keep essential features
        newFeatures = newFeatures.filter(
          (f) => f === "wifi" || f === "bluetooth"
        );
      } else if (mode === "unlocked") {
        // Enable all features
        newFeatures = ["wifi", "bluetooth", "cellular", "gps"];
      } else if (mode === "valet") {
        // Limited features for valet mode
        newFeatures = ["wifi"];
      }

      return { mode, features: newFeatures };
    });
  };

  const handleFeatureToggle = (feature: ConnectivityFeature) => {
    setSecurityState((prev) => {
      let newFeatures = [...prev.features];

      if (newFeatures.includes(feature)) {
        newFeatures = newFeatures.filter((f) => f !== feature);
      } else {
        newFeatures.push(feature);
      }

      // If no features are selected, lock the system
      if (newFeatures.length === 0) {
        return { mode: "locked", features: [] };
      }

      // If locked mode is active, only allow wifi and bluetooth
      if (prev.mode === "locked") {
        newFeatures = newFeatures.filter(
          (f) => f === "wifi" || f === "bluetooth"
        );
      }

      return { ...prev, features: newFeatures };
    });
  };

  return (
    <div className="space-y-4 p-4 bg-black/20 rounded-xl border border-white/10">
      <h3 className="text-sm font-medium text-white/80 mb-3">
        Security & Connectivity
      </h3>

      {/* Mode Toggle Group */}
      <div className="space-y-2">
        <label className="text-xs text-white/60">Security Mode</label>
        <ToggleGroup
          type="single"
          value={securityState.mode}
          onValueChange={(value) =>
            value && handleModeChange(value as SecurityMode)
          }
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem
            value="locked"
            className="bg-red-600/20 hover:bg-red-600/30 data-[state=on]:bg-red-600/40 border-red-500/30"
          >
            <Lock className="w-4 h-4" />
            <span className="text-xs">Locked</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="unlocked"
            className="bg-green-600/20 hover:bg-green-600/30 data-[state=on]:bg-green-600/40 border-green-500/30"
          >
            <Unlock className="w-4 h-4" />
            <span className="text-xs">Unlocked</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="valet"
            className="bg-yellow-600/20 hover:bg-yellow-600/30 data-[state=on]:bg-yellow-600/40 border-yellow-500/30"
          >
            <Shield className="w-4 h-4" />
            <span className="text-xs">Valet</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Features Toggle Group */}
      <div className="space-y-2">
        <label className="text-xs text-white/60">Connectivity</label>
        <ToggleGroup
          type="multiple"
          value={securityState.features}
          onValueChange={(values) => {
            values.forEach((value) => {
              if (
                !securityState.features.includes(value as ConnectivityFeature)
              ) {
                handleFeatureToggle(value as ConnectivityFeature);
              }
            });
            securityState.features.forEach((feature) => {
              if (!values.includes(feature)) {
                handleFeatureToggle(feature);
              }
            });
          }}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem
            value="wifi"
            className="bg-blue-600/20 hover:bg-blue-600/30 data-[state=on]:bg-blue-600/40 border-blue-500/30"
          >
            <Wifi className="w-4 h-4" />
            <span className="text-xs">WiFi</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="bluetooth"
            className="bg-purple-600/20 hover:bg-purple-600/30 data-[state=on]:bg-purple-600/40 border-purple-500/30"
          >
            <Bluetooth className="w-4 h-4" />
            <span className="text-xs">Bluetooth</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="cellular"
            disabled={securityState.mode === "locked"}
            className="bg-green-600/20 hover:bg-green-600/30 data-[state=on]:bg-green-600/40 border-green-500/30 disabled:opacity-50"
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs">Cellular</span>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="gps"
            disabled={securityState.mode === "locked"}
            className="bg-orange-600/20 hover:bg-orange-600/30 data-[state=on]:bg-orange-600/40 border-orange-500/30 disabled:opacity-50"
          >
            <Shield className="w-4 h-4" />
            <span className="text-xs">GPS</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Status Display */}
      <div className="text-xs text-white/60 mt-3">
        <div>
          Mode: <span className="text-white">{securityState.mode}</span>
        </div>
        <div>
          Features:{" "}
          <span className="text-white">
            {securityState.features.join(", ") || "none"}
          </span>
        </div>
      </div>
    </div>
  );
}
