import localList from "./assets/sponsors.json";

export const fetchSponsors = async (query?: string): Promise<string[]> => {
  try {
    // Use local list for development or as fallback
    if (process.env.NEXT_PUBLIC_IS_DEV) {
      return localList;
    }
    
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
        return localList;
      }
      
      const data: {
        value: string;
      }[] = await response.json();
      return data.length ? data.map((item: { value: string }) => item.value) : [];
    } catch (fetchError) {
      console.error('Fetch operation failed:', fetchError);
      return localList;
    }
  } catch (error) {
    console.error('Failed to fetch sponsors:', error);
    return localList;
  }
};
