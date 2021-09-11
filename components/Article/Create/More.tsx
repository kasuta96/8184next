import { Accordion } from "../../Tailwind/Accordion"

export default function More({
  description,
  setDescription,
  thumbnail,
  setThumbnail,
  tags,
  setTags,
}) {
  return (
    <div className="mt-6">
      <Accordion
        title={<p className="text-lg">More option</p>}
        content={
          <>
            <div className="w-full mb-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="block w-full py-2 px-4 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                placeholder="Enter your description"
                name="description"
                rows={5}
                cols={40}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full mb-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="thumbnail"
              >
                Thumbnail
              </label>
              <input
                className="block w-full py-2 px-4 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                placeholder="Enter image URL"
                name="thumbnail"
                onChange={(e) => setThumbnail(e.target.value)}
                value={thumbnail}
              />
            </div>
            <div className="w-full mb-3">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="tags"
              >
                Tags
                <span className="text-muted">(separate by comma ',')</span>
              </label>
              <input
                className="block w-full py-2 px-4 bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-300 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                placeholder="Enter keywords"
                name="tags"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </div>
          </>
        }
      />
    </div>
  )
}
