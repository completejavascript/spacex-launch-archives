import { useQuery } from "@apollo/client";

// graphql queries
import { QUERY_LAUNCH_LIST } from "./queries";
import {
  GetLaunchListQuery,
  GetLaunchListQueryVariables,
} from "../../gql/graphql";
import { useMemo, useState } from "react";

type LaunchItem = {
  flight_number?: number | null;
  mission_name?: string | null;
  launch_year?: number | null;
  launch_date_unix?: number | null;
};

type MapLaunchByYear = {
  [key: number]: Array<LaunchItem | null>;
};

type ArrayLaunchByYear = Array<[string, Array<LaunchItem | null>]>;

export default function LaunchList() {
  const { data, loading } = useQuery<
    GetLaunchListQuery,
    GetLaunchListQueryVariables
  >(QUERY_LAUNCH_LIST);

  const [search, setSearch] = useState("");

  const launchesByYear = useMemo((): ArrayLaunchByYear => {
    if (!data?.launches || loading) return [];

    const mapByYear = data.launches.reduce<MapLaunchByYear>((accum, launch) => {
      if (!launch?.launch_year) {
        return accum;
      }

      // WORKAROUND - avoid duplicate flight_number
      if (launch?.mission_name === "SXM-7") {
        return accum;
      }

      // Implement search
      if (
        search &&
        !launch?.mission_name?.toLowerCase().includes(search.toLowerCase())
      ) {
        return accum;
      }

      const key = launch.launch_year;
      accum[key] = accum[key] || [];
      accum[key] = accum[key].concat(launch);

      return accum;
    }, {});

    return Object.entries(mapByYear);
  }, [data, loading, search]);

  if (loading) {
    return (
      <div className="h-full relative overflow-y-scroll px-8">
        <div className="animate-pulse flex flex-col">
          <div className="sticky top-0">
            <div className="h-8 bg-slate-900" />
            <div className="h-4 bg-slate-900 relative w-full">
              <div className="rounded-md py-5 px-3 bg-slate-700" />
            </div>
            <div className="h-8 bg-gradient-to-b from-slate-900" />
          </div>

          <div className="mt-5">
            <div className="bg-slate-700 h-4 rounded-sm mb-4" />
            <div className="space-y-2">
              <div className="border-l border-slate-700">
                <div className="h-3 bg-slate-700 ml-4 rounded-sm" />
              </div>
              <div className="border-l border-slate-700">
                <div className="h-3 bg-slate-700 ml-4 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative overflow-y-scroll px-8">
      <div className="sticky top-0">
        <div className="h-8 bg-slate-900" />
        <div className="bg-slate-900 relative pointer-events-auto w-full">
          <input
            className="w-full rounded-md py-2 pl-3 pr-6 bg-slate-800 hover:bg-slate-700 focus:outline outline-1 outline-slate-300"
            placeholder="Search name..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          {search && (
            <span
              className="absolute right-1 top-1 cursor-pointer px-2 text-xl"
              onClick={() => setSearch("")}
            >
              &times;
            </span>
          )}
        </div>
        <div className="h-8 bg-gradient-to-b from-slate-900" />
      </div>

      <div>
        {launchesByYear?.map((launchYear) => {
          const yearStr = launchYear[0];
          const listLaunch = launchYear[1];
          return (
            <ul key={yearStr}>
              <li className="mb-8">
                <h5 className="mb-3 font-semibold text-slate-200">{yearStr}</h5>
                <ul className="space-y-2 border-l border-slate-800">
                  {listLaunch.map((launch) => {
                    return (
                      <li
                        key={launch?.flight_number}
                        className="border-l pl-4 border-transparent text-sm hover:border-slate-500 text-slate-400 hover:text-slate-300 hover:cursor-pointer"
                      >
                        {launch?.mission_name}
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
}
