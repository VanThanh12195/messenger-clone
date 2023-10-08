import getAllMessages from "@/utils/getAllMessages";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

export default async function MessageList({ currentUserID,conversationID }) {

  const messages = await getAllMessages(conversationID);

  const messageList = messages.map((message) => {
    if (message.senderId === currentUserID)
      return <OutgoingMessage message={message} />;
    return <IncomingMessage message={message} />;
  });

  return messageList;
}
