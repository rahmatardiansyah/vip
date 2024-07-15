const index = ({ title, information, children }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-xl text-justify">{information}</p>
      <div className="flex justify-around flex-wrap gap-4 mt-8">{children}</div>
    </div>
  );
};

export default index;
