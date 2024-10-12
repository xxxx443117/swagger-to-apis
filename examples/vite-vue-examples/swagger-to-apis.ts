import { swaggerToApis } from 'swagger-to-apis';

// Currently supports v2 and v3.0
swaggerToApis({
  url: 'https://petstore.swagger.io/v2/swagger.json', // Change to your URL
  output: './src',
});
