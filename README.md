# swagger-to-apis

## Installing

### Package manager

Using npm:

```bash
$ npm install swagger-to-apis
```

Using yarn:

```bash
$ yarn add swagger-to-apis
```

## Example

### For api url
```ts
import swaggerToApi from "swagger-to-apis";
```
or
```ts
import * as SwaggerToApi from 'swagger-to-apis';

SwaggerToApi.swaggerToApis({
  apiUrl: "https://openapi.example.com/api.json", // OpenApi url
  reslib: "./src/", // out lib dir
});

```

### For local json
```ts
import swaggerToApi from "swagger-to-apis";
```
or
```ts
import * as SwaggerToApi from 'swagger-to-apis';

swaggerToApi({
  assets: "./local/api.json", // local OpenApi json
  reslib: "./src", // out lib dir
});

```

