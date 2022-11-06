import { useCallback, useContext, useState } from "react";

// components
import LaunchList from "./components/LaunchList";
import LaunchProfile from "./components/LaunchProfile";
import Link from "./components/Link";

// assets
import { IconGithub, IconMoon, IconSun } from "./assets";
import { ThemeContext } from "./theme";

// ----------------------------------------------------------------------------

export default function App() {
  const { mode, handleChangeMode } = useContext(ThemeContext);
  const [launchId, setLaunchId] = useState<number | null>(null);
  const [hasLaunches, setHasLaunches] = useState<boolean>(false);
  const onHasLaunches = useCallback(() => setHasLaunches(true), []);

  // Not support os mode yet
  const toggleThemeMode = useCallback(() => {
    if (mode === "dark") handleChangeMode("light");
    else if (mode === "light") handleChangeMode("dark");
  }, [mode, handleChangeMode]);

  return (
    <div className="h-screen bg-white dark:bg-slate-900 text-slate-400 antialiased relative">
      <div className="sticky top-0 z-40 py-4 px-8 border-b border-slate-900/10 dark:border-slate-300/10 flex justify-between items-center">
        <div className="flex gap-4">
          <img src="/logo192.png" alt="" width={32} height={32} />
          <h2 className="text-xl text-slate-900 dark:text-slate-100 font-semibold">
            SpaceX Launch Archives
          </h2>
        </div>

        <div className="flex gap-5">
          <button
            className="w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
            onClick={toggleThemeMode}
          >
            {mode === "dark" && <IconMoon />}
            {mode === "light" && <IconSun />}
          </button>
          <Link
            href="https://github.com/completejavascript/spacex-launch-archives"
            className="w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
          >
            <IconGithub />
          </Link>
        </div>
      </div>

      <div className="h-full w-full flex absolute top-0 pt-16">
        <div className="w-80">
          <LaunchList
            launchId={launchId}
            onLaunchSelected={setLaunchId}
            onHasLaunches={onHasLaunches}
          />
        </div>

        <div className="flex-1">
          <LaunchProfile launchId={launchId} hasLaunches={hasLaunches} />
        </div>
      </div>
    </div>
  );
}
