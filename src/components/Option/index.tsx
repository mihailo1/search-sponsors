import { motion } from 'framer-motion';

const Option = ({ option, ...props }: { option: string }) => {
  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        className="block cursor-pointer hover:text-[#b9b8b8] transition-colors"
        {...props}
        href={`https://www.google.com/search?q=${option}`}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {option}
      </a>
    </motion.li>
  );
};

export default Option;
