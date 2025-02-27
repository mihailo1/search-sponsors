import { TextField } from '@mui/material';
import { debounce } from 'lodash';
import List from '../List';
import Option from '../Option';
import { Autocomplete as MUIAutocomplete, AutocompleteProps as MuiAutocompleteProps } from '@mui/material';
import { useState, Dispatch, SetStateAction, RefObject, useRef, useEffect } from 'react';
import { fetchSponsors } from '../../queries';

interface AutocompleteProps extends Omit<MuiAutocompleteProps<string, false, false, false>, 'renderInput' | 'options'> {
  setTitle: Dispatch<SetStateAction<string>>;
}

const searchCachedSponsors = async (value: string) => {
  const filteredSponsors = await fetchSponsors(value);
  const options: string[] = filteredSponsors
    .filter((sponsor: string) =>
      sponsor?.toLowerCase().includes(value.toLowerCase())
    )
    .slice(0, 100);
  return options;
};

const Autocomplete = ({ setTitle }: AutocompleteProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const hasTouched = useRef(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const search = debounce(async (_, value: string) => {
    setTitle(`Search Sponsors${value === '' ? '' : `: ${value}`}`);
    const isEmpty = value === '';
    const options = !isEmpty ? await searchCachedSponsors(value) : [];
    setOptions(options);
    setIsEmpty(isEmpty);
  }, 150);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && inputRef.current.value === '') {
        const simulateTyping = async (text: string) => {
          let currentValue = '';
          
          for (let i = 0; i < text.length; i++) {
            currentValue += text[i];
            
            if (inputRef.current) {
              inputRef.current.value = currentValue;
            }
            
            setInputValue(currentValue);
            search(null, currentValue);
            
            await new Promise((resolve) => 
              setTimeout(resolve, [300, 350, 250][Math.floor(Math.random() * 3)])
            );
          }
        };
        
        if (!hasTouched.current) {
          simulateTyping('Uber');
        }
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
      setInputValue(value);
      search(event, value);
      hasTouched.current = true;
  };

  return (
    <MUIAutocomplete
      className="self-center mx-auto"
      noOptionsText={!isEmpty && options.length === 0 ? 'Nothing found' : ''}
      disablePortal
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField 
          {...params} 
          label="Search" 
          inputRef={inputRef}
          value={inputValue}
        />
      )}
      getOptionLabel={(option) => option}
      renderOption={(_, option) => <Option key={option} option={option} />}
      onInputChange={handleInputChange}
      inputValue={inputValue}
      {...{ PaperComponent: isEmpty ? () => null : List }}
      popupIcon={null}
      open
    />
  );
};

export default Autocomplete;