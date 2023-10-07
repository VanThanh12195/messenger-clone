import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";

import React from "react";

export default function MessageList() {
  return (
    <>
      <OutgoingMessage />
      <IncomingMessage />
    </>
  );
}
