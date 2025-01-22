import { TextField } from '@mui/material';
import { debounce } from 'lodash';
import List from '../List';
import Option from '../Option';
import { Autocomplete as MUIAutocomplete, AutocompleteProps as MuiAutocompleteProps } from '@mui/material';

import { useState } from 'react';
import { fetchSponsors } from '../../queries';

interface AutocompleteProps extends Omit<MuiAutocompleteProps<string, false, false, false>, 'renderInput' | 'options'> {
  setTitle: (title: string) => void;
}

const Autocomplete = ({ setTitle }: AutocompleteProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const searchCachedSponsors = async (value: string) => {
    const filteredSponsors = await fetchSponsors(value);
    const options: string[] = filteredSponsors
      .filter((sponsor: string) =>
        sponsor?.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 100);
    return options;
  };

  const search = debounce(async (_, value: string) => {
    setTitle(`Search Sponsors${value === '' ? '' : `: ${value}`}`);
    const isEmpty = value === '';
    const options = !isEmpty ? await searchCachedSponsors(value) : [];
    setOptions(options);
    setIsEmpty(isEmpty);
  }, 150);

  return (
    <MUIAutocomplete
      className="self-center mx-auto"
      noOptionsText={!isEmpty && options.length === 0 ? 'Nothing found' : ''}
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search" />}
      getOptionLabel={(option) => option}
      renderOption={(_, option) => <Option key={option} option={option} />}
      onInputChange={search}
      {...{ PaperComponent: isEmpty ? () => null : List }}
      popupIcon={null}
      open
    />
  );
};

export default Autocomplete;
