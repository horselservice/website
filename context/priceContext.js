import { createContext, useContext, useEffect, useState } from "react";

const PriceContext = createContext(null);

export function PriceProvider({ children }) {
  const [customerType, setCustomerType] = useState("private"); // "private" | "business"

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("customerType")
        : null;
    if (saved === "private" || saved === "business") setCustomerType(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined")
      localStorage.setItem("customerType", customerType);
  }, [customerType]);

  return (
    <PriceContext.Provider value={{ customerType, setCustomerType }}>
      {children}
    </PriceContext.Provider>
  );
}

export function usePrice() {
  const ctx = useContext(PriceContext);
  if (!ctx) throw new Error("usePrice must be used within PriceProvider");
  return ctx;
}
