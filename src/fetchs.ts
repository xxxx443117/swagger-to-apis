import { AllSwaggerDocumentVersions } from './types';
// import fetch from 'node-fetch';
import fetch = require('node-fetch');

export const fetchData = async (
  api_url: string,
): Promise<AllSwaggerDocumentVersions> => {
  const res = await fetch(api_url, {
    headers: { 'Content-Type': 'application/json' },
  });

  // const aaa = res1.toJSON()
  const data = await res.json();
  return data as AllSwaggerDocumentVersions;
};
