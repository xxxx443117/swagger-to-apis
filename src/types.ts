import {
  // eslint-disable-next-line camelcase
  OpenAPI,
  OpenAPIV2,
  OpenAPIV3,
  OpenAPIV3_1,
} from 'openapi-types';

export type Types =
  | 'object'
  | 'integer'
  | 'string'
  | 'array'
  | 'number'
  | 'boolean';

export const baseType = ['number', 'boolean', 'string'];

export const UnknownType = {
  key: 'Unknown',
  type: 'type Unknown = unknown',
};

export interface PropertiesItem {
  description?: string;
  format?: string;
  properties?: unknown;
  type?: Types;
  default?: unknown;
  items?: InnerItems;
  $ref?: string;
  additionalProperties?: {
    $ref: string;
  };
  // in?: "path";
  // items?: {
  //   $ref: string;

  // }
}
export type InnerItems = Omit<PropertiesItem, 'items'> & {
  items?: {
    $ref: string;
    format?: string;
    type?: string;
  };
  $ref?: string;
};

export type Properties = Record<string, PropertiesItem>;

export interface SchemasItem {
  properties: Properties;
  required?: string[];
  type: Types;
  items?: InnerItems;
}

export interface ParametersItem {
  description: string;
  in: 'query' | 'path';
  name: string;
  required?: boolean;
  schema: PropertiesItem;
}

export interface Responses {
  '200': {
    content: {
      'application/json': {
        schema: {
          $ref: string;
        };
      };
    };
    description: '';
  };
}

export interface RequestBody {
  required: true;
  $ref?: string;
  content: {
    'application/json': {
      schema: {
        $ref?: string;
        type?: Types;
        properties?: Properties;
        required?: string[];
      };
    };
  };
}

// interface Test {
//   p7_go_serverApiAccountV1GetSubUserSizeRes: unknown
// }

interface Paths {
  get?: {
    parameters?: ParametersItem[];
    requestBody?: RequestBody;
    responses: Responses;
    summary: string;
    tags: string[];
  };
  post?: {
    parameters?: ParametersItem[];
    responses: Responses;
    requestBody?: RequestBody;
    summary: string;
    tags: string[];
  };
  summary: string;
}

export interface Data {
  openapi: string;
  components: {
    schemas: Record<string, SchemasItem>;
  };
  info: {
    title: string;
    version: string;
  };
  paths: Record<string, Paths>;
}

export type AllSwaggerDocumentVersions =
  | OpenAPI.Document
  | OpenAPIV2.Document
  | OpenAPIV3.Document
  | OpenAPIV3_1.Document;

export interface Options {
  skipInfo?: boolean;
  output?: string;
  url?: string;
  doc?: AllSwaggerDocumentVersions;
  forceVersion?: string;
  namespace?: string;
}

export interface TransferResult {
  api: string;
  type: string;
}

export const ALLOWED_METHODS = [
  'get',
  'post',
  'put',
  'patch',
  'delete',
  'options',
  'head',
];

export const ALLOWED_CODES = ['200'];

export const ALLOWED_PARAMETERS_IN = ['query', 'path', 'body', 'formData'];
