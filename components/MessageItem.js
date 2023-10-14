export default function MessageItem({ message, currentUserId }) {

  if (message.sender.id === currentUserId)
    return (
      <div className="flex flex-row justify-end mt-1">
        <div className="text-sm text-white grid grid-flow-row gap-2">
          <div className="flex items-center flex-row-reverse group">
            <p className="px-4 py-2 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
              {message.body}
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-row justify-start mt-1">
      <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
        <img
          className="shadow-md rounded-full w-full h-full object-cover"
          src={message?.sender?.image}
          alt=""
        />
      </div>
      <div className="text-sm text-gray-700 grid grid-flow-row gap-2">
        <div className="flex items-center group">
          <p className="px-4 py-2 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
}
