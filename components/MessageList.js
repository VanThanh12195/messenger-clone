"use client";

import { removeFromState, usePersistedState } from "@/hooks/usePersistedState";
import MessageItem from "./MessageItem";
import { pusherClient } from "@/utils/pusher";
import { useState, useEffect, useRef, useMemo } from "react";

export default function MessageList({
  currentUserId,
  conversationId,
  initialMessages,
}) {
  const messageListRef = useRef(null);

  const [messagesLength, setMessagesLength] = usePersistedState(
    conversationId + "length",
    0
  );

  if (messagesLength != initialMessages.length) {
    setMessagesLength(initialMessages.length);
    removeFromState(conversationId);
  }
  const [messages, setMessages] = usePersistedState(conversationId, []);

  useEffect(() => {
    // messageListRef?.current?.scrollIntoView({ behavior: "smooth" });

    pusherClient.subscribe(conversationId);

    function messageHandler(data) {
      setMessages((prevMessages) => [...prevMessages, data]);
      // messageListRef?.current?.scrollIntoView({ behavior: "smooth" });
    }

    pusherClient.bind("messages:new", messageHandler);

    return () => {
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unsubscribe(conversationId);
    };
  }, [conversationId]);

  useEffect(() => {
    messageListRef?.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const initialMessageList = useMemo(() => {
    return initialMessages.map((message, index) => (
      <MessageItem
        message={message}
        key={message.id}
        currentUserId={currentUserId}
      />
    ));
  }, [initialMessages, currentUserId]);

  const messageList = messages.map((message, index) => {
    return (
      <MessageItem
        message={message}
        key={message.id}
        currentUserId={currentUserId}
      />
    );
  });

  return (
    <div>
      {initialMessageList}
      {messageList}
      <div ref={messageListRef} />
    </div>
  );
}
