export default function OutgoingMessage({message}) {
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
  )
}
