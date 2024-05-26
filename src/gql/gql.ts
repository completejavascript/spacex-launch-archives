/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "\n  query LaunchList {\n    launches {\n      id\n      mission_name\n      launch_year\n      launch_date_unix\n    }\n  }\n": types.LaunchListDocument,
    "\n  query LaunchProfile($id: ID!) {\n    launch(id: $id) {\n      id\n      mission_name\n      launch_year\n      launch_success\n      details\n      launch_site {\n        site_name\n      }\n      rocket {\n        rocket_name\n        rocket_type\n      }\n      links {\n        flickr_images\n      }\n    }\n  }\n": types.LaunchProfileDocument,
};

export function graphql(source: "\n  query LaunchList {\n    launches {\n      id\n      mission_name\n      launch_year\n      launch_date_unix\n    }\n  }\n"): (typeof documents)["\n  query LaunchList {\n    launches {\n      id\n      mission_name\n      launch_year\n      launch_date_unix\n    }\n  }\n"];
export function graphql(source: "\n  query LaunchProfile($id: ID!) {\n    launch(id: $id) {\n      id\n      mission_name\n      launch_year\n      launch_success\n      details\n      launch_site {\n        site_name\n      }\n      rocket {\n        rocket_name\n        rocket_type\n      }\n      links {\n        flickr_images\n      }\n    }\n  }\n"): (typeof documents)["\n  query LaunchProfile($id: ID!) {\n    launch(id: $id) {\n      id\n      mission_name\n      launch_year\n      launch_success\n      details\n      launch_site {\n        site_name\n      }\n      rocket {\n        rocket_name\n        rocket_type\n      }\n      links {\n        flickr_images\n      }\n    }\n  }\n"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;