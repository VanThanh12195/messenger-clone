import getAllConversation from "@/utils/getAllConversation";
import ConversationItem from "./ConversationItem";

export default async function ConversationList() {

  const conversations = await getAllConversation();

  if (!conversations) return <div>No conversations!</div>;

  const conversationsList = conversations.map((conversation) => {
    return <ConversationItem conversation={conversation} key={conversation.id} />;
  });

  return conversationsList;
}
