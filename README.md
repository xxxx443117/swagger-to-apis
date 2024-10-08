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

#### create your `swagger-to-apis.ts` file
```ts
import { swaggerToApis } from "swagger-to-apis";

swaggerToApis({
  url: "https://petstore.swagger.io/v2/swagger.json", // Change to your URL
  output: "./src/apis",
});

```
#### Add the script in your `package.json` file.
```json
    "apis": "npx tsx swagger-to-apis.ts",
```

#### Run the script
```bash
$ npm run apis
```
