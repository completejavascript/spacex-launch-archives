import { useQuery } from "@apollo/client";

// graphql queries
import { QUERY_LAUNCH_PROFILE } from "./queries";
import {
  LaunchProfileQuery,
  LaunchProfileQueryVariables,
} from "../../gql/graphql";

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
    return <>Loading...</>;
  }

  if (!data) {
    return <>No data!</>;
  }

  return (
    <div>
      <div>{launchId}</div>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
