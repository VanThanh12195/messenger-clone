import getRandomUserImageUrl from "@/utils/getRandomUserImageUrl";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { MdOutlineOpenInNew } from "react-icons/md";

export default async function ConversationHeader() {
  const session = await getServerSession(options);

  return (
    <div className="p-4 flex flex-row justify-between items-center">
      <div className="w-16 h-16 relative flex flex-shrink-0">
        <img
          className="rounded-full w-full h-full object-cover"
          alt="ravisankarchinnam"
          src={getRandomUserImageUrl()}
        />
      </div>
      <div className="flex-auto min-w-0 ml-4 group-hover:block w-40">
        <p className="text-2xl font-semibold text-blue-800">
          {session?.user.name}
        </p>
        <div className="flex flex-row items-center text-base text-gray-600">
          <p>Senior Developer </p>
        </div>
      </div>

      <div className=" bg-gray-200 p-2 rounded-full hover:bg-gray-300 hover:cursor-pointer transition duration-300">
        <MdOutlineOpenInNew size={25} />
      </div>
    </div>
  );
}
