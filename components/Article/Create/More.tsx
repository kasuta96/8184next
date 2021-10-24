import { Accordion } from "../../Tailwind/Accordion"
import useTrans from "../../../hooks/useTrans"

export default function More({ description, setDescription, thumbnail, setThumbnail, tags, setTags }) {
  const { t, lang } = useTrans("primary")

  return (
    <div className="mt-6">
      <Accordion
        title={<p className="text-lg p-4">{t`More`}</p>}
        content={
          <div className="p-4">
            <div className="w-full mb-8">
              <label className="block mb-2 text-sm font-medium text-600" htmlFor="description">
                {t`Description`}
              </label>
              <textarea
                className="block w-full py-2 px-4 bg-200 text-700 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                name="description"
                rows={5}
                cols={40}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="w-full mb-8">
              <label className="block mb-2 text-sm font-medium text-600" htmlFor="thumbnail">
                {t`Thumbnail`}
              </label>
              <input
                className="block w-full py-2 px-4 bg-200 text-700 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                placeholder={t`Image URL`}
                name="thumbnail"
                onChange={(e) => setThumbnail(e.target.value)}
                value={thumbnail}
              />
            </div>
            <div className="w-full mb-8">
              <label className="block mb-2 text-sm font-medium text-600" htmlFor="tags">
                {t`Tags`}
                <span className="text-muted">
                  {t`Separate by comma`} {"' , '"}
                </span>
              </label>
              <input
                className="block w-full py-2 px-4 bg-200 text-700 placeholder-gray-400 rounded-xl text-base focus:outline-none"
                placeholder={t`Keywords`}
                name="tags"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </div>
          </div>
        }
      />
    </div>
  )
}
