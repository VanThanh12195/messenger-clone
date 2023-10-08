import getRandomUserImageUrl from "@/utils/getRandomUserImageUrl";
import getUserbyID from "@/utils/getUserbyID";

export default async function Conversation({props}) {

  const user = await getUserbyID(props.id)

  return (
    <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative w-80 hover:cursor-pointer">
      <div className="w-12 h-12 relative flex flex-shrink-0">
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src={user.image}
          alt="User2"
        />
        <div className="absolute bg-white p-0.5 rounded-full bottom-0 right-0">
          <div className="bg-green-500 rounded-full w-3 h-3" />
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4  group-hover:block">
        <p className="text-lg font-semibold text-blue-700">{user.name}</p>
        <div className="flex flex-row items-center text-base text-gray-600">
          <p className="truncate">{props.lastMessage}</p>
          <p className="w-20 ml-2" > &#8226; 4d</p>
        </div>
      </div>
      <div className="w-4 h-4 flex flex-shrink-0 group-hover:block">
        <img
          className="rounded-full w-full h-full object-cover"
          alt="user2"
          src={getRandomUserImageUrl()}
        />
      </div>
    </div>
  );
}
