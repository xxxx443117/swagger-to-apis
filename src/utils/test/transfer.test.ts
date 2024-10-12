import { transferPathParse } from '../transfer';

test('transferPathParse', () => {
  expect(transferPathParse('/pet/{petId}/uploadImage', 'params')).toBe(
    '/pet/${params.petId}/uploadImage',
  );
  expect(transferPathParse('/pet/uploadImage/{petId}')).toBe(
    '/pet/uploadImage/${petId}',
  );
  expect(transferPathParse('/pet/{petId}/{uploadImage}')).toBe(
    '/pet/${petId}/${uploadImage}',
  );
  expect(transferPathParse('/pet/:petId/uploadImage', 'params')).toBe(
    '/pet/${params.petId}/uploadImage',
  );
  expect(transferPathParse('/pet/uploadImage/:petId')).toBe(
    '/pet/uploadImage/${petId}',
  );
});
