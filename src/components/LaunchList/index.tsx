import { useQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";

// graphql queries
import { QUERY_LAUNCH_LIST } from "./queries";
import { LaunchListQuery, LaunchListQueryVariables } from "../../gql/graphql";

// hooks
import useDebounce from "../../hooks/useDebounce";

// utils
import { randomIntBetween } from "../../utils/numberHelper";

// sections
import SkeletonList from "./SkeletonList";
import { scrollIntoViewWithOffset } from "../../utils/domeHelper";

// ----------------------------------------------------------------------------

type LaunchItem = {
  id?: string | null;
  mission_name?: string | null;
  launch_year?: string | null;
  launch_date_unix?: number | null;
};

type MapLaunchByYear = {
  [key: string]: Array<LaunchItem | null>;
};

type ArrayLaunchByYear = Array<[string, Array<LaunchItem | null>]>;

// ----------------------------------------------------------------------------

export interface LaunchListProps {
  launchId: string | null;
  onLaunchSelected?: (id: string | null) => void;
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
  const debounceSearch = useDebounce(search, 200);
  const hasSelectFirstTime = useRef(false);

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
        debounceSearch &&
        !launch?.mission_name
          ?.toLowerCase()
          .includes(debounceSearch.toLowerCase())
      ) {
        return accum;
      }

      const key = launch.launch_year;
      accum[key] = accum[key] || [];
      accum[key] = accum[key].concat(launch);

      return accum;
    }, {});

    return Object.entries(mapByYear);
  }, [data, loading, debounceSearch]);

  // Select launch randomly
  useEffect(() => {
    if (hasSelectFirstTime.current) return;
    if (!onLaunchSelected) return;

    if (!launchesByYear?.length) {
      onLaunchSelected(null);
      return;
    }

    const yearData =
      launchesByYear[randomIntBetween(0, launchesByYear.length)][1];
    if (!yearData.length) {
      onLaunchSelected(null);
      return;
    }

    const launchData = yearData[randomIntBetween(0, yearData.length)];
    if (!launchData?.id) {
      onLaunchSelected(null);
      return;
    }

    onLaunchSelected(launchData.id);
    scrollIntoViewWithOffset(
      ".launch-list",
      `.flight-number-${launchData.id}`,
      -150
    );

    hasSelectFirstTime.current = true;
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
    <div className="h-full relative overflow-y-auto px-8 launch-list">
      <div className="sticky top-0">
        <div className="h-8 bg-white dark:bg-slate-900" />
        <div className="bg-white dark:bg-slate-900 relative pointer-events-auto w-full">
          <input
            className="w-full rounded-md py-2 pl-3 pr-6 bg-white text-slate-700 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 outline outline-1 dark:outline-0 dark:focus:outline-1 dark:outline-slate-300 outline-slate-300 focus:outline-slate-400"
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
                    if (!launch?.id) return null;

                    const className =
                      launchId === launch?.id
                        ? "text-sky-500 hover:text-sky-500 border-sky-500 font-semibold"
                        : "text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300  border-transparent hover:border-slate-700 dark:hover:border-slate-500";

                    return (
                      <li
                        key={launch?.id}
                        onClick={() =>
                          onLaunchSelected?.(launch?.id!)
                        }
                        className={`border-l pl-4 text-sm cursor-pointer ${className} flight-number-${launch?.id}`}
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
