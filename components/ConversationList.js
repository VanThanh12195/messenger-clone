import getAllConversation from "@/utils/getAllConversation";
import Conversation from "./Conversation";
import ConversationNew from "./ConversationNew";
import getCurrentUser from "@/utils/getCurrentUser";

export default async function ConversationList() {
  const { id } = await getCurrentUser();

  const conversations = await getAllConversation();

  if (!conversations) return <div>No conversations!</div>;

  const userIDGuest = conversations.map((conversation) =>
    conversation.userIds.filter((userId) => userId !== id)
  );

  const conversationsList = conversations.map((conversation)=>{

    if(conversation.lastMessage) return <Conversation id={ conversation.userIds.filter((userId) => userId !== id)} lastMessage = {conversation.lastMessage}/>
    return <ConversationNew id={ conversation.userIds.filter((userId) => userId !== id)}/>
  })

  return conversationsList
}
