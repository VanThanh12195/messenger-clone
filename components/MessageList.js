import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

export default function MessageList() {
  return (
    <>
      <OutgoingMessage />
      <IncomingMessage />
    </>
  );
}
