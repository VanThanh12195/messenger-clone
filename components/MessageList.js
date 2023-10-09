"use client";

import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { pusherClient } from "@/utils/pusher";
import { useState, useEffect, useRef } from "react";

export default function MessageList({
  currentUserID,
  conversationID,
  initialMessages,
}) {
  const messageListRef = useRef(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    messageListRef?.current?.scrollIntoView({ behavior: "smooth" });

    pusherClient.subscribe(conversationID);

    pusherClient.bind("messages:new", (data) => {

      setMessages((prevMessages) => [...prevMessages, data]);

      messageListRef?.current?.scrollIntoView({ behavior: "smooth" });
    });

    return () => {
      pusherClient.unbind("messages:new");
      pusherClient.unsubscribe(conversationID);
    };
  }, [conversationID]);

  const initialMessageList = initialMessages.map((message) => {
    if (message.senderId === currentUserID)
      return <OutgoingMessage message={message} key={message.id} />;
    return <IncomingMessage message={message} key={message.id} />;
  });

  const messageList = messages.map((message) => {
    if (message.senderId === currentUserID)
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
