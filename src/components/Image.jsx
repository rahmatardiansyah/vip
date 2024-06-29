const Image = ({ src, alt, onClick, isSelected }) => {
  return (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      className={`cursor-pointer border-2 ${isSelected ? 'border-red-500' : 'border-transparent'}`}
    />
  );
};

export default Image;
