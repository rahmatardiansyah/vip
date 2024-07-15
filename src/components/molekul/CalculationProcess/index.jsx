const index = ({ title, classes = '', children }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className={classes}>{children}</div>
    </div>
  );
};

export default index;
