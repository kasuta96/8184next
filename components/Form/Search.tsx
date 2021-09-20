import { SearchIcon } from "@heroicons/react/outline"

export default function Search({
  value,
  onChange,
  placeholder = "Search",
}: {
  value?: string
  onChange?: any
  placeholder?: string
}) {
  return (
    <div className="flex items-center rounded-full bg-gray-200 dark:bg-gray-700 p-1">
      <input
        className="items-center w-full ml-2 bg-transparent outline-none"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <button className="px-2" type="submit">
        <SearchIcon className="h-5 opacity-50" />
      </button>
    </div>
  )
}
