import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessengerInput from "@/components/MessengerInput";
import getAllMessages from "@/utils/getAllMessages";
import getServerSideSession from "@/utils/getServerSideSession";

export default async function ConversationChat({ params }) {

  const session = await getServerSideSession();

  const allMessages = await getAllMessages(params.conversationId);

  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <ChatHeader userGuest={allMessages.users[0]} />
      <div className="p-4 flex-1 overflow-y-auto">
        <MessageList
          initialMessages={allMessages.messages}
          currentUserId={session.user.id}
          conversationId={params.conversationId}
        />
      </div>
      <MessengerInput
        currentUserId={session.user.id}
        currentUserImage={session.user.image}
        conversationId={params.conversationId}
      />
    </section>
  );
}
