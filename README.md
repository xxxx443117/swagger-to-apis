# swagger-to-apis

## Installing

### Package manager

Using npm:

```bash
$ npm install axios
```

Using yarn:

```bash
$ yarn add axios
```

## Example

### For api url
```ts
import swaggerToApi from "swagger-to-apis";

swaggerToApi({
  apiUrl: "https://openapi.example.com/api.json", // OpenApi url
  reslib: "./apis", // out lib dir
});

```

### For local json
```ts
import swaggerToApi from "swagger-to-apis";

swaggerToApi({
  assets: "./local/api.json", // local OpenApi json
  reslib: "./apis", // out lib dir
});

```

