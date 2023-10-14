import { HiMiniPhone } from "react-icons/hi2";
import { BiSolidVideoPlus } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";

export default function ChatHeader({ userGuest }) {

  return (
    <div className="px-6 py-4 flex flex-row flex-none justify-between items-center shadow">
      <div className="flex">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src={userGuest[0].image}
            alt=""
          />
        </div>
        <div className="text-sm">
          <p className="font-bold">{userGuest[0].name}</p>
          <p>Active 1h ago</p>
        </div>
      </div>
      <div className="flex gap-4">
        <HiMiniPhone color="blue" size={30} className="  cursor-pointer" />
        <BiSolidVideoPlus color="blue" size={30} className=" cursor-pointer" />
        <FaInfoCircle color="blue" size={30} className="cursor-pointer" />
      </div>
    </div>
  );
}
