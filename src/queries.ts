export const fetchSponsors = async (query?: string) => {
  const response = await fetch(
    `http://192.168.8.151:8000/api/strings/search?query=${query ?? ''}`,
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
