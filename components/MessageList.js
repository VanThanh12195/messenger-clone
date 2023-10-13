"use client";

import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { pusherClient } from "@/utils/pusher";
import { useState, useEffect, useRef } from "react";

export default function MessageList({
  currentUserId,
  conversationId,
  initialMessages,
}) {
  const messageListRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageListRef?.current?.scrollIntoView({ behavior: "smooth" });

    pusherClient.subscribe(conversationId);

    function messageHandler(data) {
      setMessages((prevMessages) => [...prevMessages, data]);
      messageListRef?.current?.scrollIntoView({ behavior: "smooth" });
    }

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unsubscribe(conversationId);
    };
  }, [conversationId]);

  const initialMessageList = initialMessages.map((message) => {
    if (message.sender.id === currentUserId)
      return <OutgoingMessage message={message} key={message.id} />;
    return <IncomingMessage message={message} key={message.id} />;
  });

  const messageList = messages.map((message) => {
    if (message.sender.id === currentUserId)
      return <OutgoingMessage message={message} key={message.id} />;
    return <IncomingMessage message={message} key={message.id} />;
  });

  return (
    <div>
      {initialMessageList}
      {messageList}
      <div ref={messageListRef} />
    </div>
  );
}
