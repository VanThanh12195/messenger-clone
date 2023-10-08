import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessengerInput from "@/components/MessengerInput";

export default function ConversationChat({params}) {

    return (
        <>
          <div className="h-screen w-full flex">
            <div className="flex-1 flex flex-col">
              <main className="flex-grow flex flex-row min-h-0">
                <section className="flex flex-col flex-auto border-l border-gray-800">
                  <ChatHeader params={params}/>
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