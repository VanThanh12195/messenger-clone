import ChatRoom from "@/components/ChatRoom";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import ButtonSignOut from "@/components/ButtonSignOut";

export default async function page() {

  const session = await getServerSession(options);


  console.log('session is ' + JSON.stringify(session));

  return (
    <>
      <p>
        You are signed in as <strong>{session?.user.name}</strong>.
      </p>
      <ChatRoom />
      <ButtonSignOut/>
    </>
  );
}
