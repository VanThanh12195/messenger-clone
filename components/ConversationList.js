import getAllConversation from "@/utils/getAllConversation";
import Conversation from "./Conversation";
import ConversationNew from "./ConversationNew";

export default async function ConversationList() {

  const conversations = await getAllConversation();

  if (!conversations) return <div>No conversations!</div>;

  const conversationsList = conversations.map((conversation)=>{

    if(conversation.lastMessage) return <Conversation conversation={conversation}/>
    return <ConversationNew conversation={conversation}/>
  })

  return conversationsList
}
