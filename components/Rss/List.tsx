import FormatDate from "../../components/handleData/FormatDate"
import { BookmarkIcon, TranslateIcon } from "@heroicons/react/outline"
import useTrans from "../../hooks/useTrans"
import Modal from "./Modal"
import GetContent from "./GetContent"

export interface RssType {
  title: string
  description: string
  link: string
  created: string
}

export default function List({
  data,
  source,
}: {
  data: RssType[]
  source: any
}) {
  const { t, lang } = useTrans("rss")
  const { ModalCtn, openModal, setModalContent, setDisabled } = Modal()

  const RssPreview = async (link: string) => {
    openModal()
    const res = await GetContent(link)

    if (res) {
      setModalContent(res)
      // loaded data -> undisable
      setDisabled(false)
    } else {
      setModalContent({
        error: "Can't get content",
      })
    }
  }

  return (
    <>
      <ModalCtn />

      {data.map((item, i) => {
        return (
          <div key={i} className="group p-4 my-4 bg-50 rounded-lg space-y-1">
            <h5
              onClick={() => RssPreview(item.link)}
              className="cursor-pointer text-900"
            >
              {item.title}
            </h5>
            {/* <p>{data.link}</p> */}
            <p className="flex items-center justify-between text-xs space-x-2">
              <span className="p-2 text-600">
                {source.name} ・ <FormatDate value={item.created} />
              </span>
              <span className="items-center hidden group-hover:flex group-focus:flex text-indigo-400">
                <button
                  title={t`Save for later`}
                  className="p-2 rounded-full hover:bg-300"
                >
                  <BookmarkIcon className="w-4 h-4" />
                </button>
                <button
                  title={t`Translate this content`}
                  className="p-2 rounded-full hover:bg-300"
                >
                  <TranslateIcon className="w-4 h-4" />
                </button>
              </span>
            </p>
            <p className="text-600 text-sm line-3">{item.description}</p>
          </div>
        )
      })}
    </>
  )
}
