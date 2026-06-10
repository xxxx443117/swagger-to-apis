import { AllSwaggerDocumentVersions } from './types';
// import fetch from 'node-fetch';
import fetch = require('node-fetch');

export const fetchData = async (api_url: string): Promise<AllSwaggerDocumentVersions> => {
  const res = await fetch(api_url, {
    headers: { 'Content-Type': 'application/json' }
  });

  if (!res.ok) {
    throw new Error(`fetch swagger failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data as AllSwaggerDocumentVersions;
};
