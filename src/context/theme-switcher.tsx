import React, { useEffect } from "react";
import { useTheme } from "../context/theme-provider";
import { BsMoon, BsSun } from "react-icons/bs";

type SwitchProps = {
  light: string;
  dark: string;
}

const ThemeSwitch: React.FC<SwitchProps> = ({ light, dark }) => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "h") {
        toggleTheme();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleTheme]);

  return (
    <button 
      onClick={toggleTheme}
      className="w-full p-4 flex items-center text-sm font-medium text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors duration-150 ease-in-out"
    >
      {theme === "light" ? (
        <>
          <BsSun className="w-5 h-5 text-gray-400 dark:text-slate-500 mr-3" />
          {light}
        </>
      ) : (
        <>
          <BsMoon className="w-5 h-5 text-gray-400 dark:text-slate-500 mr-3" />
          {dark}
        </>
      )}
    </button>
  );
}

export default ThemeSwitch;
