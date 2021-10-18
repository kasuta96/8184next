import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline"
import Btn from "../Buttons/Btn"
import Vote from "./Vote"
import { useState } from "react"
import Spin from "../Icons/Spin"

const Article = ({ authorId, articleId, published }: { authorId: string; articleId: number; published: boolean }) => {
  const router = useRouter()
  const [publish, setPublish] = useState(published)
  const [publishing, setPublishing] = useState(false)

  async function publishArticle(id: number): Promise<void> {
    setPublishing(true)
    const res = await fetch(`${process.env.HOST}/api/publish/${id}?publish=${publish}`, {
      method: "PUT",
    })
    const json = await res.json()
    if (res.ok) {
      setPublish(json)
    } else {
      console.log(json)
    }
    setPublishing(false)
  }

  async function deleteArticle(id: number): Promise<void> {
    const res = await fetch(`${process.env.HOST}/api/article/${id}`, {
      method: "DELETE",
    })
    const json = await res.json()
    if (res.ok) {
      await router.push("/a")
    } else {
      console.log(json)
    }
  }

  const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const articleBelongsToUser = session?.user?.id === authorId
  const publisher = session?.user?.role === "ADMIN" || "MOD"

  return (
    <div className="container mt-16">
      {userHasValidSession && publisher && (
        <>
          <hr />
          <div className="flex items-center my-4">
            <span className="text-600 font-bold mr-4">Mod</span>
            <Btn title="Delete" Icon={TrashIcon} onClick={() => deleteArticle(articleId)} />
            <button onClick={() => publishArticle(articleId)} className="btn-primary" disabled={publishing}>
              {publish ? "Unpublish" : "Publish"}
              {publishing && <Spin className="ml-3" />}
            </button>
            {publish && <p className="ml-2 text-600">This article has been published</p>}
          </div>
        </>
      )}
      {userHasValidSession && articleBelongsToUser && (
        <>
          <hr />
          <div className="flex items-center my-4">
            <span className="text-600 font-bold mr-4">Author</span>
            <Btn title="Delete" Icon={TrashIcon} onClick={() => deleteArticle(articleId)} />
            <Btn
              title="Edit"
              Icon={PencilAltIcon}
              onClick={() =>
                router.push({
                  pathname: `/a/create`,
                  query: { id: articleId },
                })
              }
            />
          </div>
        </>
      )}
      <hr />
      <Vote id={articleId} />
    </div>
  )
}

export default Article
