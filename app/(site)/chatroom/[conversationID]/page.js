import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessengerInput from "@/components/MessengerInput";
import findConversationWithUser from "@/utils/findConversationWithUser";
import getAllMessages from "@/utils/getAllMessages";
import getServerSideSession from "@/utils/getServerSideSession";
import { redirect } from "next/navigation";

export default async function ConversationChat({ params }) {
  const session = await getServerSideSession();

  const checkUser = await findConversationWithUser(
    session.user.id,
    params.conversationId
  );

  if (checkUser === false) {
    redirect("/chatroom");
  }

  const allMessages = await getAllMessages(params.conversationId);

  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <ChatHeader userGuest={allMessages.users} />
      <div className="p-4 flex-1 overflow-y-auto">
        <MessageList
          initialMessages={allMessages.messages}
          currentUserId={session.user.id}
          conversationId={params.conversationId}
        />
      </div>
      <MessengerInput
        users={[...allMessages.users, session.user]}
        conversationId={params.conversationId}
      />
    </section>
  );
}
