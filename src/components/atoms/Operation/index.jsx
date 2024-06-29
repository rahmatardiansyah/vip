const index = ({ title, children }) => {
  return (
    <div className="my-4 px-4 mt-10">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-xl mt-4">{children}</p>
    </div>
  );
};

export default index;
