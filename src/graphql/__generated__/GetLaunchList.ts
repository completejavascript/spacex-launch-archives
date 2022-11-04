/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetLaunchList
// ====================================================

export interface GetLaunchList_launches {
  __typename: "Launch";
  flight_number: number | null;
  mission_name: string | null;
  launch_year: number | null;
}

export interface GetLaunchList {
  launches: (GetLaunchList_launches | null)[] | null;
}
