const index = ({ children }) => {
  return (
    <div className="my-4 px-4 mt-10">
      <h2 className="text-xl font-semibold">Contoh Kasus</h2>
      <p className="text-xl mt-2 text-justify">{children}</p>
    </div>
  );
};

export default index;
