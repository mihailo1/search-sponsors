import { HTMLAttributes, useState } from "react";
import "./App.css";
import { useCachedSponsors } from "../../hooks";
import { Autocomplete, TextField } from "@mui/material";
import Providers from "../Providers";
import { debounce } from "lodash";
import { cacheSearch, getCachedSearch } from "../../utils";

const List = ({ children }: HTMLAttributes<HTMLElement>) => (
  <div className="scrollbar">{children}</div>
);

const App = () => {
  const [options, setOptions] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const sponsorsTable = useCachedSponsors();

  const searchCachedSponsors = (value: string) => {
    const cached = getCachedSearch()[value];
    return cached
      ? cached
      : sponsorsTable
          .filter((sponsor) =>
            sponsor.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 100);
  };

  const search = debounce((_, value: string) => {
    const isEmpty = value === "";
    const options = !isEmpty ? searchCachedSponsors(value) : [];
    if (!isEmpty && options.length) cacheSearch({ [value]: options });
    setOptions(options);
    setIsEmpty(isEmpty);
  }, 150);

  return (
    <Providers>
      <Autocomplete
        noOptionsText={!isEmpty && options.length === 0 ? "Nothing found" : ""}
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
        getOptionLabel={(option) => option}
        renderOption={(_, option) => <span key={option}>{option}</span>}
        onInputChange={search}
        {...{ PaperComponent: isEmpty ? () => null : List }}
        popupIcon={null}
        open
      />
    </Providers>
  );
};

export default App;
