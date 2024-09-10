import { IoIosInformationCircle, IoIosWarning } from 'react-icons/io';

const AlertInformation = ({ type, title, children }) => {
  const typeAlert = {
    warning: () => <IoIosInformationCircle size={30} className="text-orange-300" />,
    info: () => <IoIosWarning size={30} className="text-blue-400" />
  };

  const typeClass = {
    warning: 'bg-orange-100 text-yellow-900',
    info: 'bg-blue-100 text-blue-900'
  };

  return (
    <div className={`mb-4 p-4 rounded ${typeClass[type]}`}>
      <div className="flex my-1 gap-2">
        {typeAlert[type]()}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p>{children?.main}</p>
      <div className="mt-4">{children?.extra}</div>
    </div>
  );
};

export default AlertInformation;
