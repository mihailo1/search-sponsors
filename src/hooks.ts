import { useState, useEffect } from 'react';
import { getSponsors, setCached } from './utils';
import { fetchSponsors } from './queries';

export const useCachedSponsors = () => {
  const [sponsors, setSponsors] = useState<string[]>([]);

  useEffect(() => {
    const fetchAndSetSponsors = async () => {
      const sponsors = await fetchSponsors();
      if (sponsors.length) {
        setSponsors(sponsors);
        setCached({ results: sponsors });
      } else if (getSponsors().results) {
        setSponsors(getSponsors().results);
      }
    };

    fetchAndSetSponsors();
  }, []);

  return sponsors;
};
