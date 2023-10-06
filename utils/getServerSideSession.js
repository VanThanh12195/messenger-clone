import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";


export default async function getServerSideSession() {

    const session = await getServerSession(options);


  return session
}
