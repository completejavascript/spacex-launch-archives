import { gql } from "@apollo/client";

export const QUERY_LAUNCH_LIST = gql`
  query LaunchList {
    launches {
      id
      mission_name
      launch_year
      launch_date_unix
    }
  }
`;
