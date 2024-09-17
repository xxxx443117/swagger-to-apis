import { AllSwaggerDocumentVersions } from './types';

export const fetchData = async (
  api_url: string,
): Promise<AllSwaggerDocumentVersions> => {
  const res = await fetch(api_url);

  // const aaa = res1.toJSON()
  const data = await res.json();
  return data;
};
