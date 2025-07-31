"use client";
import { create } from "zustand";

type Mode = "off" | "keep" | "dog" | "camp";

type ClimateState = {
  isOn: boolean;
  keepAcOnMode: Mode;
  temperature: number;
  passengerTemp: number;
  driverTemp: number;
  split: boolean;
  setIsOn: (isOn: boolean) => void;
  setKeepAcOnMode: (keepAcOnMode: Mode) => void;
  setTemperature: (
    temperatureAction: "+" | "-" | "set",
    passenger?: boolean,
    value?: number
  ) => void;
  setSplit: (split: boolean) => void;
  setPassengerTemp: (passengerTemp: number) => void;
  setDriverTemp: (driverTemp: number) => void;
};

export const useClimateStore = create<ClimateState>((set) => ({
  isOn: false,
  keepAcOnMode: "off",
  temperature: 70,
  split: false,
  passengerTemp: 70,
  driverTemp: 70,
  setIsOn: (isOn: boolean) => set({ isOn }),
  setKeepAcOnMode: (keepAcOnMode: Mode) => set({ keepAcOnMode }),
  setTemperature: (temperatureAction, passenger, value) =>
    set((state) => {
      if (value && passenger) {
        // clamp down the value to 59-83
        const clampedValue = Math.max(59, Math.min(83, value));
        return { passengerTemp: clampedValue };
      } else if (value) {
        // clamp down the value to 59-83
        const clampedValue = Math.max(59, Math.min(83, value));
        return { temperature: clampedValue };
      }
      const newTemperature =
        temperatureAction === "+"
          ? state.temperature + 1
          : state.temperature - 1;

      if (passenger) {
        const newPassengerTemperature =
          temperatureAction === "+"
            ? state.passengerTemp + 1
            : state.passengerTemp - 1;

        if (newPassengerTemperature < 59 || newPassengerTemperature > 83) {
          return { passengerTemp: state.passengerTemp };
        }

        return { passengerTemp: newPassengerTemperature };
      }

      if (newTemperature < 59 || newTemperature > 83) {
        return { temperature: state.temperature };
      }
      if (state.split) {
        return {
          temperature: newTemperature,
          driverTemp: newTemperature,
        };
      }
      return { temperature: newTemperature, passengerTemp: newTemperature };
    }),
  setSplit: (split: boolean) => set({ split }),
  setPassengerTemp: (passengerTemp: number) => set({ passengerTemp }),
  setDriverTemp: (driverTemp: number) => set({ driverTemp }),
}));
