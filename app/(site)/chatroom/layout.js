import ConversationHeader from "@/components/ConversationHeader";
import ConversationList from "@/components/ConversationList";
import ConversationSearchBar from "@/components/ConversationSearchBar";
import getAllConversation from "@/utils/getAllConversation";
import getServerSideSession from "@/utils/getServerSideSession";

export default async function ChatRoomLayout({ children }) {
  const session = await getServerSideSession();

  const currentUserEmail = session.user.email;

  const conversations = await getAllConversation();

  return (
    <div className="h-screen w-full flex">
      <div className="flex-1 flex flex-col">
        <main className="flex-grow flex flex-row min-h-0">
          <section>
            <ConversationHeader currentUser={session.user} />
            <ConversationSearchBar />
            <div className="p-2 flex-1">
              <ConversationList
                initialConversations={conversations}
                currentUserEmail={currentUserEmail}
              />
            </div>
          </section>
          {children}
        </main>
      </div>
    </div>
  );
}
