import { GrSearch } from "react-icons/gr";

export default function ConversationSearchBar() {
  return (
    <div className="p-4">
      <form onSubmit="">
        <div className="relative">
          <label>
            <input
              className="rounded-full py-2 pr-6 pl-10 w-full bg-gray-200 focus:shadow-md transition duration-300 ease-in"
              type="text"
              defaultValue=""
              placeholder="Search Messenger"
            />
            <span className="absolute top-0 left-0 mt-3 ml-3 inline-block">
              <GrSearch size={20} />
            </span>
          </label>
        </div>
      </form>
    </div>
  );
}
