"use client";

import { formatRelativeTime } from "@/utils/formatRelativeTime";
import Link from "next/link";
import { pusherClient } from "@/utils/pusher";
import { useEffect, useState } from "react";

export default function ConversationItem({ conversation, currentUserEmail }) {
  const [message, setMessage] = useState({
    body: conversation.lastMessage,
    timeStamp: conversation.lastMessageAt,
  });

  useEffect(() => {
    pusherClient.subscribe(conversation.id);

    function messageHandler(data) {
      if (data.conversationId === conversation.id)
        setMessage({ body: data.body, timeStamp: data.createdAt });
    }

    pusherClient.bind("conversation:updated", messageHandler);

    return () => {
      pusherClient.unbind("conversation:updated", messageHandler);
      pusherClient.unsubscribe(conversation.id);
    };
  }, [conversation.id]);

  return (
    <Link href={`/chatroom/${conversation.id}`}>
      <div className="flex justify-between items-center p-3 hover:bg-gray-100 rounded-lg relative w-80 hover:cursor-pointer">
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
              {message.body ? (
                message.body
              ) : (
                <strong>Start a new conversation.</strong>
              )}
            </p>
            <p className="w-20 ml-2">
              &#8226; {formatRelativeTime(new Date(message.timeStamp))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
