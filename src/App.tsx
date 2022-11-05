import LaunchList from "./components/LaunchList";
import LaunchProfile from "./components/LaunchProfile";

export default function App() {
  return (
    <div className="h-screen bg-slate-900 text-slate-400 antialiased relative">
      <h1 className="sticky top-0 z-40 text-xl py-4 px-8 border-b border-slate-300/10 bg-slate-900 text-slate-100 font-semibold">
        🚀 SpaceX Launch Archives
      </h1>

      <div className="h-full flex absolute top-0 pt-16">
        <div className="w-80 border-r border-slate-300/10">
          <LaunchList />
        </div>

        <div className="flex-1">
          <LaunchProfile />
        </div>
      </div>
    </div>
  );
}
