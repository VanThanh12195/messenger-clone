"use client";

import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import { pusherClient } from "@/utils/pusher";

export default function ConversationList({
  initialConversations,
  currentUserEmail,
}) {
  const [conversations, setConversations] = useState(initialConversations);

  if (!conversations) return <div>No conversations!</div>;

  useEffect(() => {
    pusherClient.subscribe(currentUserEmail);

    function updateConversation(data) {
      let modifiedConversation = "";

      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].id === data.conversationId) {
          modifiedConversation = conversations.splice(i, 1)[0];
          break;
        }
      }
      setConversations([
        {
          ...modifiedConversation,
          lastMessage: data.body,
          lastMessageAt: data.createdAt,
        },
        ...conversations,
      ]);
    }

    function newConversation(data) {
      setConversations([data, ...conversations]);
    }

    pusherClient.bind("conversation:update", updateConversation);
    pusherClient.bind("conversation:new", newConversation);

    return () => {
      pusherClient.unbind("conversation:update", updateConversation);
      pusherClient.unbind("conversation:new", newConversation);
      pusherClient.unsubscribe(currentUserEmail);
    };
  }, [conversations]);

  const conversationsList = conversations.map((conversation) => {
    return (
      <ConversationItem conversation={conversation} key={conversation.id} />
    );
  });

  return conversationsList;
}
