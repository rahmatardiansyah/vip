const index = ({ classes = 'justify-end', children }) => {
  return (
    <div className="my-10">
      <h2 className="text-xl font-semibold">Topik Lainnya</h2>
      <div className={`flex ${classes} items-center mt-4`}>{children}</div>
    </div>
  );
};

export default index;
