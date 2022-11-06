import { useQuery } from "@apollo/client";

// graphql queries
import { QUERY_LAUNCH_PROFILE } from "./queries";
import {
  LaunchProfileQuery,
  LaunchProfileQueryVariables,
} from "../../gql/graphql";

// sections
import SkeletonProfile from "./SkeletonProfile";

// ----------------------------------------------------------------------------

interface LaunchProfileProps {
  launchId: number | null;
  hasLaunches: boolean;
}

// ----------------------------------------------------------------------------

export default function LaunchProfile({
  launchId,
  hasLaunches,
}: LaunchProfileProps) {
  const { data, loading } = useQuery<
    LaunchProfileQuery,
    LaunchProfileQueryVariables
  >(QUERY_LAUNCH_PROFILE, {
    variables: {
      id: String(launchId),
    },
  });

  if (loading || !hasLaunches) {
    return <SkeletonProfile />;
  }

  if (!data) {
    return (
      <div className="h-full w-full relative overflow-y-auto p-8">No data!</div>
    );
  }

  return (
    <div className="h-full w-full relative overflow-y-auto p-8">
      <div className="mb-2 font-semibold">
        <span className="text-slate-700 dark:text-slate-200">
          Flight {data.launch?.flight_number}
        </span>
        {": "}
        {data.launch?.launch_success ? (
          <span className="text-lime-500">Success</span>
        ) : (
          <span className="text-rose-500">Failed</span>
        )}
      </div>

      <h1 className="text-slate-800 dark:text-slate-100 font-bold text-2xl mb-6">
        {data.launch?.mission_name}
        {data.launch?.rocket &&
          ` (${data.launch.rocket.rocket_name} | ${data.launch.rocket.rocket_type})`}
      </h1>

      <p className="mb-6 text-slate-700 dark:text-slate-200">
        {data.launch?.details}
      </p>

      {data.launch?.links?.flickr_images && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {data.launch.links.flickr_images.map((image, i) =>
            image ? (
              <img
                src={image}
                className="w-full rounded-md"
                key={image}
                alt={`${data.launch?.mission_name} ${i}`}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
