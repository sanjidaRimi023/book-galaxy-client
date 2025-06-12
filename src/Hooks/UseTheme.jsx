import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "pastel" ? "pastel" : "dark"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = (isDark) => {
    setTheme(isDark ? "dark" : "pastel");
  };

  return { theme, toggleTheme };
};

export default useTheme;