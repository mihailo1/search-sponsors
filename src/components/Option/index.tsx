const Option = ({ option, ...props }: { option: string }) => {
  const handleClick = () => {
    window.open(`https://www.google.com/search?q=${option}`, '_blank');
  };

  return (
    <span className="block cursor-pointer" onClick={handleClick} {...props}>
      {option}
    </span>
  );
};

export default Option;
