
import getServerSideSession from "@/utils/getServerSideSession";
import NewMessageButton from "./NewMessageButton";

export default async function ConversationHeader() {

  const session = await getServerSideSession()

  return (
    <div className="p-4 flex flex-row justify-between items-center">
      <div className="w-12 h-12 relative flex flex-shrink-0">
        <img
          className="rounded-full w-full h-full object-cover"
          alt="ravisankarchinnam"
          src={session?.user.image}
        />
      </div>
      <div className="flex-auto min-w-0 ml-2 group-hover:block w-40">
        <p className="text-2xl font-semibold text-blue-800">
          {session?.user.name}
        </p>
        <div className="flex flex-row items-center text-sm text-gray-600">
          <p>{session?.user.email} </p>
        </div>
      </div>
      <NewMessageButton />
    </div>
  );
}
