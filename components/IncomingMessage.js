
export default  function IncomingMessage({message} ){

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
  )
}
