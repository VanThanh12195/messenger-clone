"use client";

import { signOut } from "next-auth/react";

export default function ButtonSignOut() {
  function handleSignOut() {
    signOut();
  }

  return <button onClick={handleSignOut}>Sign Out</button>;
}
