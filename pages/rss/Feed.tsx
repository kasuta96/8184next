import ParseRss from "../../lib/rss"
import useTrans from "../../hooks/useTrans"
import source from "./source.json"
import { useEffect, useState } from "react"
import { Accordion } from "../../components/Tailwind/Accordion"
import List from "../../components/Rss/List"
import Search from "../../components/Form/Search"
import { ArraySearch } from "../../components/handleData/Search"

export default function Feed() {
  const { t, lang } = useTrans("rss")

  const [search, setSearch] = useState("")
  const [feed, setFeed] = useState(null)
  const [feedSearch, setFeedSearch] = useState(null)
  const [feedSource, setFeedSource] = useState(null)
  const [active, setActive] = useState("")
  const [feeding, setFeeding] = useState(false)

  useEffect(() => {
    loadFeed()
  }, [])

  const loadFeed = async (sou = "nhk", cat = "0", url = "") => {
    setSearch("")
    setActive(sou + cat)
    setFeeding(true)
    let rssUrl = ""

    if (url) {
      rssUrl = url
    } else {
      let rssSource = source.find((s) => s.name === sou)
      rssUrl = rssSource?.cat?.find((c) => c.id === cat)?.url
      setFeedSource(rssSource.author)
    }

    if (rssUrl) {
      const rss = await ParseRss(rssUrl, null, 50)
      if (rss) {
        setFeed(rss.items)
        setFeedSearch(null)
      }
    }
    setFeeding(false)
  }

  useEffect(() => {
    let value = search

    if (value) {
      let search = ArraySearch(feed, value)
      setFeedSearch(search)
    } else {
      setFeedSearch(feed)
    }
  }, [feed, search])

  return (
    <div className="px-2">
      {source.map((s) => {
        return (
          <div key={s.name}>
            <Accordion
              title={<div className="p-2">{s.author.name}</div>}
              content={
                <div className="p-2">
                  {s.cat.map((c) => {
                    return (
                      <button
                        key={c.id}
                        onClick={() => loadFeed(s.name, c.id)}
                        className={`px-2 py-1 m-1 rounded-full border border-indigo-500 ${
                          s.name + c.id == active && "bg-indigo-500 text-white"
                        }`}
                      >
                        {t(c.name)}
                      </button>
                    )
                  })}
                </div>
              }
              show={true}
            />
          </div>
        )
      })}
      {feed && (
        <div className={`my-8 ${feeding && "animate-pulse"}`}>
          <div className="flex justify-between items-center">
            <div className="text-600 text-xs">
              <span>
                {t`Result`}: {feedSearch ? feedSearch.length : feed.length}
              </span>
            </div>
            <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <List data={feedSearch ? feedSearch : feed} source={feedSource} />
        </div>
      )}
    </div>
  )
}
