import getAllConversation from "@/utils/getAllConversation";
import ConversationItem from "./ConversationItem";
import getServerSideSession from "@/utils/getServerSideSession";

export default async function ConversationList() {
  const session = await getServerSideSession();

  const currentUserEmail = session.user.email;

  const conversations = await getAllConversation();

  if (!conversations) return <div>No conversations!</div>;

  const conversationsList = conversations.map((conversation) => {
    return (
      <ConversationItem
        conversation={conversation}
        key={conversation.id}
        currentUserEmail={currentUserEmail}
      />
    );
  });

  return conversationsList;
}
