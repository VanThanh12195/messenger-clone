import ConversationHeader from "@/components/ConversationHeader";
import ConversationList from "@/components/ConversationList";
import ConversationSearchBar from "@/components/ConversationSearchBar";


export default function ChatRoomLayout({ children }) {

  return (
   <>
      <div className="h-screen w-full flex">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <section>
              <ConversationHeader />
              <ConversationSearchBar />
              <div className="p-2 flex-1">
                <ConversationList />
              </div>
            </section>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
