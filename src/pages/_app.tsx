import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import './global.scss';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#ffffff3b',
          },
        },
      })}
    >
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
