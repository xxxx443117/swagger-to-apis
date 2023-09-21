export type Types =
  | 'object'
  | 'integer'
  | 'string'
  | 'array'
  | 'number'
  | 'boolean';

export const baseType = ['number', 'boolean', 'string'];

export interface PropertiesItem {
  description?: string;
  format?: string;
  properties?: unknown;
  type?: Types;
  default?: unknown;
  items?: InnerItems;
  $ref?: string;
  // in?: "path";
  // items?: {
  //   $ref: string;

  // }
}
export type InnerItems = Omit<PropertiesItem, 'items'> & {
  items?: {
    $ref: string;
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
