import { companiesMock } from "./mocks";

export const fetchSponsors = async (query?: string) => {
  console.log('fetchSponsors', process.env.NEXT_PUBLIC_IS_DEV);
  if (process.env.NEXT_PUBLIC_IS_DEV) return companiesMock;
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/strings/search?query=${query ?? ''}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  if (!response.ok) {
    console.error(`Error fetching sponsors: ${response.statusText}`);
    return [];
  }
  
  const data = await response.json();
  return data.length ? data.map((item: { value: string }) => item.value) : [];
};
