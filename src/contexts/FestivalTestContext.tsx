"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { type SpecialDay } from "@/config/specialDays";

interface FestivalTestContextType {
  testFestival: SpecialDay | null;
  setTestFestival: (festival: SpecialDay | null) => void;
}

const FestivalTestContext = createContext<FestivalTestContextType | undefined>(undefined);

export function FestivalTestProvider({ children }: { children: ReactNode }) {
  const [testFestival, setTestFestival] = useState<SpecialDay | null>(null);

  return (
    <FestivalTestContext.Provider value={{ testFestival, setTestFestival }}>
      {children}
    </FestivalTestContext.Provider>
  );
}

export function useFestivalTest() {
  const context = useContext(FestivalTestContext);
  if (context === undefined) {
    throw new Error("useFestivalTest must be used within a FestivalTestProvider");
  }
  return context;
}
