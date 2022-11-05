/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query GetLaunchList {\n    launches {\n      flight_number\n      mission_name\n      launch_year\n      launch_date_unix\n    }\n  }\n": types.GetLaunchListDocument,
};

export function graphql(source: "\n  query GetLaunchList {\n    launches {\n      flight_number\n      mission_name\n      launch_year\n      launch_date_unix\n    }\n  }\n"): (typeof documents)["\n  query GetLaunchList {\n    launches {\n      flight_number\n      mission_name\n      launch_year\n      launch_date_unix\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;