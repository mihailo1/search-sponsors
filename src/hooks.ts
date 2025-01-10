import { useState, useEffect } from 'react';
import sponsorsTable from './assets/sponsors.json';
import { getSponsors, setCached } from './utils';

export const useCachedSponsors = () => {
  const [sponsors, setSponsors] = useState<string[]>([]);

  useEffect(() => {
    if (getSponsors().results) setSponsors(getSponsors().results);
    else {
      setSponsors(sponsorsTable);
      setCached({ results: sponsorsTable });
    }
  }, []);

  return sponsors;
};
