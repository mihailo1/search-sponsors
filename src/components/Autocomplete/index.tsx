import {
  AutocompleteProps,
  Autocomplete as MUIAutocomplete,
  TextField,
} from '@mui/material';
import { motion } from 'framer-motion';

interface _AutocompleteProps
  extends AutocompleteProps<string, false, false, false> {
  [key: string]: any;
}

const Autocomplete = (props: _AutocompleteProps) => {
  return (
    <motion.div
      className="flex justify-center items-center h-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div className="self-center mx-auto">
        <MUIAutocomplete
          {...props}
          renderOption={(_, option) => (
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.li>
          )}
        />
      </motion.div>
    </motion.div>
  );
};

export default Autocomplete;
