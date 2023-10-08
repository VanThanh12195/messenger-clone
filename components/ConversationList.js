import getAllConversation from "@/utils/getAllConversation";
import Conversation from "./Conversation";
import ConversationNew from "./ConversationNew";

export default async function ConversationList() {

  const conversations = await getAllConversation()

  

  return (
    <div>
      
    </div>
  );
}
