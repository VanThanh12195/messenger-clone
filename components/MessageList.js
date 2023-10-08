"use client";

import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { pusherClient } from "@/utils/getPusherClient";
import { useState, useEffect } from "react";

export default function MessageList({
  currentUserID,
  conversationID,
  initialMessages,
}) {
  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {

    const channel = pusherClient.subscribe(conversationID);

    channel.bind("messages:new", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      channel.unbind("messages:new");
      pusherClient.unsubscribe(conversationID);
    };
  }, [conversationID]);

  const messageList = messages.map((message) => {
    if (message.senderId === currentUserID)
      return <OutgoingMessage message={message} key={message.id} />;
    return <IncomingMessage message={message} key={message.id} />;
  });

  return <div>{messageList}</div>;
}
