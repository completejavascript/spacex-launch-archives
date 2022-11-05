import { useQuery } from "@apollo/client";

// graphql queries
import { QUERY_LAUNCH_LIST } from "./queries";
import { GetLaunchListQuery, GetLaunchListQueryVariables } from "../../gql/graphql";

export default function LaunchList() {
  const { data, loading } = useQuery<GetLaunchListQuery, GetLaunchListQueryVariables>(QUERY_LAUNCH_LIST);

  return (
    <div className="h-full relative overflow-y-scroll px-8 pb-8">
      <div className="sticky top-0">
        <div className="h-8 bg-slate-900" />
        <div className="bg-slate-900 relative pointer-events-auto w-full">
          <input
            className="w-full rounded-md py-2 px-3 bg-slate-800 hover:bg-slate-700 focus:outline outline-1 outline-slate-300"
            placeholder="Search"
          />
        </div>
        <div className="h-8 bg-gradient-to-b from-slate-900" />
      </div>

      <div>
        {data?.launches?.map((launch) => {
          return (
            <div key={launch?.flight_number}>
              {launch?.mission_name} - {launch?.launch_year}
            </div>
          );
        })}
      </div>
    </div>
  );
}
