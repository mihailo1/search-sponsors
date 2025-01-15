import { AppProps } from 'next/app';
import { ThemeProvider, createTheme } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
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
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full"
          key={Component.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default MyApp;
