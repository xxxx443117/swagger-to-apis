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

## Generate

#### create your `swagger-to-apis.ts` file
```ts
import { swaggerToApis } from "swagger-to-apis";

// Currently supports v2 and v3.0
swaggerToApis({
  url: "https://petstore.swagger.io/v2/swagger.json", // Change to your URL
  output: "./src",
});

```
#### Add the script in your `package.json` file.
```json
    "api": "npx tsx swagger-to-apis.ts",
```

#### Run the script
```bash
$ npm run api
```

## Use

```ts
import { Api } from 'src/apis';

let pet_info: Api.SwaggerV2.Pet;

const res = await Api.SwaggerV2Api.get_pet_petId(1);
if (Api.isSuccess(res)) {
  pet_info = res.data
}

```