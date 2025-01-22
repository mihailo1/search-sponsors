import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from '../components/Head';
import Autocomplete from '../components/Autocomplete';
import { fetchSponsors } from '../queries';

interface HomeProps {
  sponsors: string[];
}

const Home = ({ sponsors }: HomeProps) => {
  const [title, setTitle] = useState('Search Sponsors');

  return (
    <>
      <Head title={title} description="Search for sponsors" />
      <Autocomplete setTitle={setTitle} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  let sponsors = await fetchSponsors();
  sponsors = sponsors.filter(
    (sponsor: string | undefined): sponsor is string => sponsor !== undefined
  );
  return { props: { sponsors } };
};

export default Home;
