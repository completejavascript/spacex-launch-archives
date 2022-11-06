import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

// ----------------------------------------------------------------------------

interface ThemeProviderProps {
  children: ReactNode;
}

interface IThemeContext {
  mode: ThemeMode;
  handleChangeMode: (mode: ThemeMode) => void;
}

type ThemeMode = "light" | "dark" | "os";

// ----------------------------------------------------------------------------

const defaultState: IThemeContext = {
  mode: "light",
  handleChangeMode: () => {},
};

export const ThemeContext = createContext<IThemeContext>(defaultState);

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const handleChangeMode = useCallback((mode: ThemeMode) => {
    if (mode === "os") {
      localStorage.removeItem("theme");
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else if (mode === "dark") {
      localStorage.theme = mode;
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = mode;
      document.documentElement.classList.remove("dark");
    }

    setMode(mode);
  }, []);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setMode("light");
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        handleChangeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
