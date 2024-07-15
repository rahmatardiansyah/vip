import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { Tooltip } from '../../atoms';
import { TbReload } from 'react-icons/tb';
import { HiMiniPlayPause } from 'react-icons/hi2';

const index = ({
  heading,
  information,
  isAnimating,
  playAnimation,
  pauseAnimation,
  stopAnimation,
  playStep
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mt-4">{heading}</h3>
      <p className="text-justify">
        Gunakan tombol (<IoMdPlay size={15} className="inline-block" />) di bawah ini untuk melihat
        proses {information}.
      </p>
      <div className="flex gap-4 items-center mt-4">
        {isAnimating ? (
          <Tooltip tooltip="pause">
            <IoMdPause
              size={30}
              onClick={pauseAnimation}
              className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
            />
          </Tooltip>
        ) : (
          <Tooltip tooltip="play">
            <IoMdPlay
              size={30}
              onClick={playAnimation}
              className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
            />
          </Tooltip>
        )}

        <Tooltip tooltip="repeat">
          <TbReload
            size={30}
            onClick={stopAnimation}
            className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
          />
        </Tooltip>
        <Tooltip tooltip="step by step">
          <HiMiniPlayPause
            size={30}
            onClick={playStep}
            className="select-none cursor-pointer text-gray-700 hover:text-gray-900"
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default index;
