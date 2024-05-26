import { useCallback, useContext, useState } from "react";

// components
import LaunchList from "./components/LaunchList";
import LaunchProfile from "./components/LaunchProfile";
import Link from "./components/Link";
import Brand from "./components/Brand";

// assets
import { IconClose, IconGithub, IconMenu, IconMoon, IconSun } from "./assets";
import { ThemeContext } from "./theme";

// ----------------------------------------------------------------------------

export default function App() {
  const { mode, handleChangeMode } = useContext(ThemeContext);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const [launchId, setLaunchId] = useState<string | null>(null);
  const [hasLaunches, setHasLaunches] = useState<boolean>(false);
  const onHasLaunches = useCallback(() => setHasLaunches(true), []);

  // Not support os mode yet
  const toggleThemeMode = useCallback(() => {
    if (mode === "dark") handleChangeMode("light");
    else if (mode === "light") handleChangeMode("dark");
  }, [mode, handleChangeMode]);

  const handleLaunchSelected = useCallback((id: string | null) => {
    setLaunchId(id);
    setIsNavBarOpen(false);
  }, []);

  return (
    <>
      <div className="h-screen bg-white dark:bg-slate-900 text-slate-400 antialiased relative">
        {!isNavBarOpen && (
          <div className="sticky top-0 z-40 py-4 px-8 border-b border-slate-900/10 dark:border-slate-300/10 flex justify-between items-center">
            <Brand />

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

              <button
                className="block md:hidden w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                onClick={() => setIsNavBarOpen(true)}
              >
                <IconMenu />
              </button>
            </div>
          </div>
        )}

        <div className="h-full w-full flex absolute top-0 pt-16">
          <div className={"hidden md:block md:w-80"}>
            <LaunchList
              launchId={launchId}
              onLaunchSelected={handleLaunchSelected}
              onHasLaunches={onHasLaunches}
            />
          </div>

          <div className="flex-1">
            <LaunchProfile launchId={launchId} hasLaunches={hasLaunches} />
          </div>
        </div>
      </div>

      {/* Drawer on Mobile */}
      <div
        className={`${
          isNavBarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed z-50 top-0 left-0 w-full h-full bg-white dark:bg-slate-900 transform ease-in-out transition-all duration-300`}
      >
        <div className="absolute h-full w-full top-0 pt-16">
          <LaunchList
            launchId={launchId}
            onLaunchSelected={handleLaunchSelected}
            onHasLaunches={onHasLaunches}
          />
        </div>

        <div className="absolute w-full flex items-center py-4 px-8 top-0">
          <div className="flex-1">
            <Brand />
          </div>

          <button
            className="block w-5 h-5 text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
            onClick={() => setIsNavBarOpen(false)}
          >
            <IconClose />
          </button>
        </div>
      </div>
    </>
  );
}
