import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";

// graphql queries
import { QUERY_LAUNCH_LIST } from "./queries";
import { LaunchListQuery, LaunchListQueryVariables } from "../../gql/graphql";

// sections
import SkeletonList from "./SkeletonList";

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

export interface LaunchListProps {
  launchId: number | null;
  onLaunchSelected?: (id: number) => void;
  onHasLaunches?: () => void;
}

export default function LaunchList({
  launchId,
  onLaunchSelected,
  onHasLaunches,
}: LaunchListProps) {
  const { data, loading } = useQuery<LaunchListQuery, LaunchListQueryVariables>(
    QUERY_LAUNCH_LIST
  );

  const [search, setSearch] = useState("");

  // Group launches by years
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

  // Default select first launch
  useEffect(() => {
    if (!onLaunchSelected) return;
    if (!launchesByYear?.length) return;

    const firstYear = launchesByYear[0];
    if (!firstYear[1].length) return;

    if (firstYear[1][0]?.flight_number) {
      onLaunchSelected(firstYear[1][0]?.flight_number);
    }
  }, [launchesByYear, onLaunchSelected]);

  useEffect(() => {
    if (!loading) {
      onHasLaunches?.();
    }
  }, [loading, onHasLaunches]);

  if (loading) {
    return <SkeletonList />;
  }

  return (
    <div className="h-full relative overflow-y-auto px-8">
      <div className="sticky top-0">
        <div className="h-8 bg-white dark:bg-slate-900" />
        <div className="bg-white dark:bg-slate-900 relative pointer-events-auto w-full">
          <input
            className="w-full rounded-md py-2 pl-3 pr-6 bg-white dark:bg-slate-800 dark:hover:bg-slate-700 outline outline-1 dark:outline-0 dark:focus:outline-1 dark:outline-slate-300 outline-slate-300 focus:outline-slate-400"
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
        <div className="h-8 bg-gradient-to-b from-white dark:from-slate-900" />
      </div>

      <div>
        {launchesByYear?.map((launchYear) => {
          const yearStr = launchYear[0];
          const listLaunch = launchYear[1];
          return (
            <ul key={yearStr}>
              <li className="mb-8">
                <h5 className="mb-3 font-semibold text-slate-900 dark:text-slate-200">
                  {yearStr}
                </h5>
                <ul className="space-y-2 border-l border-slate-200 dark:border-slate-800">
                  {listLaunch.map((launch) => {
                    if (!launch?.flight_number) return null;

                    const className =
                      launchId === launch?.flight_number
                        ? "text-sky-500 hover:text-sky-500 border-sky-500 font-semibold"
                        : "text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300  border-transparent hover:border-slate-700 dark:hover:border-slate-500";

                    return (
                      <li
                        key={launch?.flight_number}
                        onClick={() =>
                          onLaunchSelected?.(launch?.flight_number!)
                        }
                        className={`border-l pl-4 text-sm cursor-pointer ${className}`}
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
