
import { MdOutlineOpenInNew } from "react-icons/md";

import getServerSideSession from "@/utils/getServerSideSession";
export default async function ConversationHeader() {

  const session = await getServerSideSession();

  return (
    <div className="p-4 flex flex-row justify-between items-center">
      <div className="w-16 h-16 relative flex flex-shrink-0">
        <img
          className="rounded-full w-full h-full object-cover"
          alt="ravisankarchinnam"
          src={session?.user.image}
        />
      </div>
      <div className="flex-auto min-w-0 ml-4 group-hover:block w-40">
        <p className="text-2xl font-semibold text-blue-800">
          {session?.user.name}
        </p>
        <div className="flex flex-row items-center text-sm text-gray-600">
          <p>{session?.user.email} </p>
        </div>
      </div>

      <div className=" bg-gray-200 p-2 rounded-full hover:bg-gray-300 hover:cursor-pointer transition duration-300">
        <MdOutlineOpenInNew size={25} />
      </div>
    </div>
  );
}
