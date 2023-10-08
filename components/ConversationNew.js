import getCurrentUser from "@/utils/getCurrentUser";
import getUserbyID from "@/utils/getUserbyID";
import Link from "next/link";

export default async function ConversationNew({ conversation }) {
  const { id } = await getCurrentUser();

  const userIdGuest = conversation.userIds.filter((userId) => userId !== id);
  const conversationID = conversation.id;

  const userGuest = await getUserbyID(userIdGuest[0]);

  return (
    <Link href={`/chatroom/${conversationID}` }>
      <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative w-80 hover:cursor-pointer">
        <div className="w-12 h-12 relative flex flex-shrink-0">
          <img
            className="shadow-md rounded-full w-full h-full object-cover"
            src={userGuest.image}
            alt="User2"
          />
          <div className="absolute bg-white p-0.5 rounded-full bottom-0 right-0">
            <div className="bg-green-500 rounded-full w-3 h-3" />
          </div>
        </div>
        <div className="flex-auto min-w-0 ml-4  group-hover:block">
          <p className="text-lg font-semibold text-blue-700">
            {userGuest.name}
          </p>
          <div className="flex flex-row items-center text-base text-gray-600">
            <p className="truncate font-bold">Start a new conversation. </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
