import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import { useClearDataCallback, useSetData } from "../../components/Editor"
import { useSession } from "next-auth/client"
import AccessDenied from "../../components/Error/AccessDenied"
import More from "../../components/Article/Create/More"
import useTrans from "../../hooks/useTrans"
import Footer from "../../components/layouts/Footer"
import Header from "../../components/layouts/Header"

// get data if has id query
export const getServerSideProps = async ({ query }) => {
  if (query.id) {
    const res = await fetch(`${process.env.HOST}/api/article/${query.id}`)
    const article = await res.json()

    if (article?.status) {
      return {
        props: article,
      }
    } else {
      return {
        notFound: true,
      }
    }
  } else {
    return {
      props: {
        status: false,
      },
    }
  }
}

// CSR
const Editor = dynamic(() => import("../../components/Editor/editor").then((mod) => mod.EditorContainer), {
  ssr: false,
})

const Create = (props) => {
  const { t, lang } = useTrans()
  const router = useRouter()

  const [session] = useSession()
  const [title, setTitle] = useState(props?.body?.title || "")
  const [editor, setEditor] = useState(null)
  const [thumbnail, setThumbnail] = useState(props?.body?.thumbnail || "")
  const [description, setDescription] = useState(props?.body?.description || "")
  const [tags, setTags] = useState(props?.body?.tags || "")
  const [loadding, setLoading] = useState(false)
  const [fetchType, setFetchType] = useState({
    method: "POST",
    url: `${process.env.HOST}/api/article`,
  })

  if (props?.status) {
    useSetData(editor, props.body.content)
    useEffect(() => {
      if (props.body.author.id === session?.user?.id) {
        console.log("edit")
        setFetchType({
          method: "PUT",
          url: `${process.env.HOST}/api/article`,
        })
      }
    }, [session])
  }

  // save handler
  // const onSave = useSaveCallback(title, editor);

  // load data
  // const {data, loading} = useLoadData()

  // set saved data
  // useSetData(editor, data);

  // clear data callback
  const clearData = useClearDataCallback(editor)

  // const disabled = editor === null || loading;

  const submitData = async (draft = false) => {
    setLoading(true)
    try {
      const content = await editor.save()
      const id = props.body?.id || ""
      const body = { title, content, description, thumbnail, tags, id, draft }
      const res = await fetch(fetchType.url, {
        method: fetchType.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const result = await res.json()
      if (result.route) {
        router.push(result.route)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  if (!session) {
    return (
      <>
        <Header />
        <AccessDenied />
        <Footer />
      </>
    )
  }
  return (
    <>
      <Header />

      <section className="flex-grow min-h-screen p-5 mx-auto">
        <div className="lg:max-w-3xl mx-auto">
          <div className="items-center md:flex md:space-x-4">
            <div className="w-full">
              <input
                className="block w-full px-4 py-2 text-800 text-lg font-semibold bg-100 rounded-xl focus:outline-none"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("primary", "Title")}
                type="text"
                value={title}
              />
            </div>
          </div>

          <div className="w-full mt-4">
            <Editor reInit editorRef={setEditor} />

            <div className="text-right text-600">
              <button className="btn-text" onClick={clearData}>
                {t("primary", "Clear")}
              </button>
            </div>
          </div>

          <More
            description={description}
            setDescription={setDescription}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            tags={tags}
            setTags={setTags}
          />

          <div className="flex justify-center mt-6 space-x-2">
            <button
              disabled={!editor || !title || loadding}
              onClick={() => submitData(false)}
              className="btn bg-blue-600 text-gray-50"
            >
              {t("primary", "Save")}
            </button>
            <button
              disabled={!editor || !title || loadding}
              onClick={() => submitData(true)}
              className="btn bg-blue-600 text-gray-50"
            >
              {t("primary", "Draft")}
            </button>

            <div className="btn bg-600 text-50" onClick={() => router.back()}>
              {t("primary", "Back")}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Create
