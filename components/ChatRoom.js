import EmptyState from "./EmptyState";

export default function ChatRoom() {
  return (
    <>
      <div className="h-screen w-full flex">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
           <EmptyState/>
          </main>
        </div>
      </div>
    </>
  );
}
