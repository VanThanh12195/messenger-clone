import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessengerInput from "@/components/MessengerInput";
import getConversationbyID from "@/utils/getConversationbyID";
import getCurrentUser from "@/utils/getCurrentUser";
import getUserbyID from "@/utils/getUserbyID";

export default async function ConversationChat({ params }) {

  const conversation = await getConversationbyID(params.conversationID);

  const { id } = await getCurrentUser();

  const userIdGuest = conversation.userIds.filter((userId) => userId !== id);

  const userGuest = await getUserbyID(userIdGuest[0]);

  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <ChatHeader userGuest={userGuest} />
      <div className="p-4 flex-1">
        <MessageList currentUserID={id} conversationID={params.conversationID}/>
      </div>
      <MessengerInput currentUserID={id} conversationID ={params.conversationID}/>
    </section>
  );
}
