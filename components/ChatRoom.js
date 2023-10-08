import ConversationList from "./ConversationList";
import ConversationHeader from "./ConversationHeader";
import ConversationSearchBar from "./ConversationSearchBar";
import ChatHeader from "./ChatHeader";
import MessengerInput from "./MessengerInput";
import MessageList from "./MessageList";

export default function ChatRoom() {

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
            <section className="flex flex-col flex-auto border-l border-gray-800">
              <ChatHeader />
              <div className="p-4 flex-1">
                <MessageList />
              </div>
              <MessengerInput />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
