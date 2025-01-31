import localList from "./assets/sponsors.json";

export const fetchSponsors = async (query?: string): Promise<string[]> => {
  // use local json
  if (process.env.NEXT_PUBLIC_IS_DEV) return localList;
  
  try {
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
    
    const data: {
      value: string;
    }[] = await response.json();
    return data.length ? data.map((item: { value: string }) => item.value) : [];
  } catch (error) {
    console.error('Failed to fetch sponsors:', error);
    return localList;
  }
};
