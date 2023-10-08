
export default function IncomingMessage() {
  return (
    <div className="flex flex-row justify-start">
    <div className="w-8 h-8 relative flex flex-shrink-0 mr-4">
      <img
        className="shadow-md rounded-full w-full h-full object-cover"
        src="https://randomuser.me/api/portraits/women/33.jpg"
        alt=""
      />
    </div>
    <div className="text-sm text-gray-700 grid grid-flow-row gap-2">
      <div className="flex items-center group">
        <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
          Hey! How are you?
        </p>
      </div>
    </div>
  </div>
  )
}