"use client";

import { formatRelativeTime } from "@/utils/formatRelativeTime";
import { useRouter } from "next/navigation";

export default function ConversationItem({ conversation }) {
  const router = useRouter();

  function handleNavigate() {
    router.push(`/chatroom/${conversation.id}`);
  }

  return (
    <div
      className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative w-80 hover:cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="w-12 h-12 relative flex flex-shrink-0">
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src={conversation.users[0].image}
          alt="User2"
        />
        <div className="absolute bg-white p-0.5 rounded-full bottom-0 right-0">
          <div className="bg-green-500 rounded-full w-3 h-3" />
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4  group-hover:block">
        <p className="text-lg font-semibold text-blue-700">
          {conversation.users[0].name}
        </p>
        <div className="flex flex-row items-center text-base text-gray-600">
          <p className="truncate">
            {conversation.lastMessage ? (
              `${
                conversation.users[0].id === conversation.lastMessageSenderId
                  ? ""
                  : "You: "
              }
                ${conversation.lastMessage}`
            ) : (
              <strong>Start a new conversation.</strong>
            )}
          </p>
          <p className="w-20 ml-2">
            &#8226; {formatRelativeTime(new Date(conversation.lastMessageAt))}
          </p>
        </div>
      </div>
    </div>
  );
}
