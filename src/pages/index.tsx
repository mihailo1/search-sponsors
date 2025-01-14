import { useState } from 'react';
import { TextField } from '@mui/material';
import { debounce } from 'lodash';
import { cacheSearch, getSearch } from '@/src/utils';
import { GetStaticProps } from 'next';
import List from '../components/List';
import sponsors from '@/src/assets/sponsors.json';
import Option from '../components/Option';
import Head from 'next/head';
import Autocomplete from '../components/Autocomplete';

interface HomeProps {
  sponsors: string[];
}

const Home = ({ sponsors }: HomeProps) => {
  const [options, setOptions] = useState<string[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [value, setValue] = useState('');

  const searchCachedSponsors = (value: string) => {
    const cached = getSearch()[value];
    return cached
      ? cached
      : sponsors
          .filter((sponsor) =>
            sponsor.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 100);
  };

  const search = debounce((_, value: string) => {
    setValue(value);
    const isEmpty = value === '';
    const options = !isEmpty ? searchCachedSponsors(value) : [];
    if (!isEmpty && options.length) cacheSearch({ [value]: options });
    setOptions(options);
    setIsEmpty(isEmpty);
  }, 150);

  return (
    <>
      <Head>
        <title>Search Sponsors{value === '' ? '' : `: ${value}`}</title>
        <meta name="description" content="Search for sponsors" />
      </Head>
      <Autocomplete
        className="self-center mx-auto"
        noOptionsText={!isEmpty && options.length === 0 ? 'Nothing found' : ''}
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search" />}
        getOptionLabel={(option) => option}
        renderOption={(_, option) => <Option option={option} />}
        onInputChange={search}
        {...{ PaperComponent: isEmpty ? () => null : List }}
        popupIcon={null}
        open
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: { sponsors } };
};

export default Home;
