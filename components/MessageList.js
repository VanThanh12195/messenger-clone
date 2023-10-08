"use client";

import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { pusherClient } from "@/utils/getPusherClient";
import { useState, useEffect, useRef } from "react";

export default function MessageList({
  currentUserID,
  conversationID,
  initialMessages,
}) {
  const [messages, setMessages] = useState(initialMessages);

  const bottomRef = useRef ()
  useEffect(() => {
    pusherClient.subscribe(conversationID);

    bottomRef?.current?.scrollIntoView();

    pusherClient.bind("messages:new", (data) => {
      bottomRef?.current?.scrollIntoView();

      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      pusherClient.unbind("messages:new");
      pusherClient.unsubscribe(conversationID);
    };
  }, [conversationID]);

  const messageList = messages.map((message) => {
    if (message.senderId === currentUserID)
      return <OutgoingMessage message={message} key={message.id} />;
    return <IncomingMessage message={message} key={message.id} />;
  });

  return (
    <div>
      {messageList} <div ref={bottomRef} />
    </div>
  );
}
