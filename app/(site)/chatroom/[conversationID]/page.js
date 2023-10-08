import ChatHeader from "@/components/ChatHeader";
import MessageList from "@/components/MessageList";
import MessengerInput from "@/components/MessengerInput";

export default function ConversationChat({ params }) {
  return (
    <section className="flex flex-col flex-auto border-l border-gray-800">
      <ChatHeader params={params} />
      <div className="p-4 flex-1">
        <MessageList />
      </div>
      <MessengerInput />
    </section>
  );
}
