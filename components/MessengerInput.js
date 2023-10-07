import { BiSolidPlusCircle } from "react-icons/bi";
import {
  BsFillImageFill,
  BsCameraFill,
  BsEmojiSmileFill,
} from "react-icons/bs";
import { MdKeyboardVoice } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";

export default function MessengerInput() {
  return (
      <div className="flex flex-row items-center p-4">
        <div className="flex gap-4 mr-2">
          <BiSolidPlusCircle
            color="blue"
            size={25}
            className="cursor-pointer"
          />
          <BsFillImageFill color="blue" size={25} className="cursor-pointer" />
          <BsCameraFill color="blue" size={25} className="cursor-pointer" />
          <MdKeyboardVoice color="blue" size={25} className="cursor-pointer" />
        </div>

        <div className="relative flex-grow">
          <label>
            <input
              className="rounded-full py-2 pl-3 pr-10 w-full border focus:border-gray-300 bg-gray-200 focus:bg-gray-300 focus:outline-none text-black focus:shadow-md transition duration-300 ease-in"
              type="text"
              defaultValue=""
              placeholder="Aa"
            />
            <BsEmojiSmileFill
              color="blue"
              className="absolute top-0 right-0 mt-2 mr-3 cursor-pointer flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6"
            />
          </label>
        </div>
        <AiFillLike
          color="blue"
          size={30}
          className=" flex-shrink-0 focus:outline-none mx-2 block cursor-pointer"
        />
      </div>
  );
}
