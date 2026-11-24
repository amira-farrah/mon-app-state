import React, { createContext, useState, useContext, useEffect } from "react";

// WHEN TO DECLARE? Once, OUTSIDE any React component function.
// createContext(null) creates the shared channel object.
export const ThemeContext = createContext(null);

// HOW TO PROVIDE? Build a Provider component wrapping {children}
export function ThemeProvider({ children }) {
  // 1. Internal theme state (persisted in localStorage)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("app_theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("app_theme", theme);
  }, [theme]);

  // 2. Shared updater function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 3. Broadcast: everything inside "value" becomes accessible to descendants
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook: simplifies imports and catches missing <ThemeProvider> wrappers
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside a <ThemeProvider>');
  }
  return context; // Directly returns { theme, toggleTheme }
}
