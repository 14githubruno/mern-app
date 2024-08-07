import { createContext, useState } from "react";

export const FilterContext = createContext("");

export default function ContextForSearchbarFiltering({ children }) {
  const [filter, setFilter] = useState("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </FilterContext.Provider>
  );
}
