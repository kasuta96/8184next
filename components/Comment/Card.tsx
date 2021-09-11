import { XIcon } from "@heroicons/react/outline"
import { useState } from "react"
import Avatar from "../Image/Avatar"

function Card({
  user,
  text,
  star,
  time,
  onDelete,
  deleting,
}: {
  user: {
    name: string
    image: string
    id: number
  }
  text: string
  star?: number
  time: string
  onDelete?: any
  deleting: boolean
}) {
  const [loading, setLoading] = useState(false)
  return (
    <div className="rounded-lg mb-6">
      <div className="flex items-start text-left">
        <div className="flex-none">
          <Avatar image={user.image} size={40} name={user.name} />
        </div>
        <div className="flex-grow ml-4 rounded-xl bg-200 shadow">
          {onDelete && (
            <button
              className={`float-right p-2 rounded-xl text-600 hover:text-red-500 hover:bg-100`}
              onClick={() => {
                onDelete()
                setLoading(true)
              }}
              aria-label="Close"
              disabled={loading}
            >
              <XIcon
                className={`${deleting && loading && "animate-spin "} w-4 h-4`}
              />
            </button>
          )}
          <div className="p-4">
            <p className="flex items-baseline">
              <span className="text-gray-600 dark:text-gray-200 font-bold">
                {user.name}
              </span>
              <span className="text-gray-500 dark:text-gray-300 ml-2 text-sm">
                {time}
              </span>
            </p>
            <div className="mt-3">
              <p className="mt-1 dark:text-white whitespace-pre-line">{text}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
