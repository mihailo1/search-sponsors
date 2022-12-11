import { useState, useEffect } from "react";
import Papa from "papaparse";
import sponsorsTable from "./assets/sponsors.csv";
import { getCached, setCached } from "./utils";

export const useCachedSponsors = () => {
  const [sponsors, setSponsors] = useState<string[]>([]);

  useEffect(() => {
    // don't do parsing every session, but cache it in localStorage
    if (getCached().results) setSponsors(getCached().results);
    else
      Papa.parse(sponsorsTable, {
        download: true,
        complete: function ({ data }: { data: [string][] }) {
          const results = [...new Set(data.flat())];
          setSponsors(results);
          setCached({ results });
        },
      });
  }, []);

  return sponsors;
};
