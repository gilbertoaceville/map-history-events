import { useEffect, useState } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("events-theme");
    return savedTheme ? JSON.parse(savedTheme) : "dark-theme";
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeTheme = () => {
    let docTheme;
    if (theme === "light-theme") {
      docTheme = "dark-theme";
    } else {
      docTheme = "light-theme";
    }

    setTheme(docTheme);
    localStorage.setItem("events-theme", JSON.stringify(docTheme));
  };

  return { changeTheme };
}
