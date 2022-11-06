import { useCallback, useState } from "react";

import LaunchList from "./components/LaunchList";
import LaunchProfile from "./components/LaunchProfile";

export default function App() {
  const [launchId, setLaunchId] = useState<number | null>(null);
  const [hasLaunches, setHasLaunches] = useState<boolean>(false);
  const onHasLaunches = useCallback(() => setHasLaunches(true), []);

  return (
    <div className="h-screen bg-slate-900 text-slate-400 antialiased relative">
      <div className="sticky top-0 z-40  py-4 px-8 border-b border-slate-300/10 bg-slate-900 flex gap-4">
        <img src="/logo192.png" alt="" width={32} height={32} />
        <h2 className="text-xl text-slate-100 font-semibold">
          SpaceX Launch Archives
        </h2>
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
