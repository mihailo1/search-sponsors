import { motion } from 'framer-motion';

const searchCompany = async (company: string) => {
  const response = await fetch(`/api/proxy?q=${encodeURIComponent(company)}`);
  return response.text(); // return the response as text
};

const Option = ({ option, ...props }: { option: string }) => {

  const handleMouseEnter = async () => {
    // const response = await searchCompany(option);
    // console.log(response);
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={handleMouseEnter}
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
