import getAllConversation from "@/utils/getAllConversation";
import ConversationItem from "./ConversationItem";
import { formatRelativeTime } from "@/utils/formatRelativeTime";


export default async function ConversationList() {

  const distance = formatRelativeTime(new Date("2023-10-01T10:24:35.169+00:00"))

  console.log(distance);

  const conversations = await getAllConversation();

  if (!conversations) return <div>No conversations!</div>;

  const conversationsList = conversations.map((conversation) => {
    return (
      <ConversationItem conversation={conversation} key={conversation.id} />
    );
  });

  return conversationsList;
}
