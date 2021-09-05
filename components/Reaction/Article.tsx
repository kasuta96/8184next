import { useSession } from "next-auth/client"
import { useRouter } from "next/router"
import { TrashIcon, PencilAltIcon } from "@heroicons/react/outline"
import Btn from "../Buttons/Btn"
import Vote from "./Vote"

const Article = ({ authorId, articleId }) => {
  const router = useRouter()

  // async function publishArticle(id: number): Promise<void> {
  //   await fetch(`${process.env.NEXTAUTH_URL}/api/publish/${id}`, {
  //     method: "PUT",
  //   });
  //   await router.push("/a")
  // }

  async function deleteArticle(id: number): Promise<void> {
    const res = await fetch(process.env.HOST + `/api/article/${id}`, {
      method: "DELETE",
    })
    const data = await res.json()
    if (data?.status == "success") {
      await router.push("/a")
    } else {
      console.log(data)
    }
  }

  const [session, loading] = useSession()
  if (loading) {
    return <div>Authenticating ...</div>
  }
  const userHasValidSession = Boolean(session)
  const articleBelongsToUser = session?.id === authorId

  return (
    <div className="container p-2 my-8">
      {/* {!props.published && userHasValidSession && articleBelongsToUser && (
        <button onClick={() => publishArticle(props.id)}>Publish</button>
      )} */}
      {userHasValidSession && articleBelongsToUser && (
        <>
          <hr />
          <div className="flex items-center my-4">
            <span className="text-gray-500 font-bold mr-4">Author</span>
            <Btn
              title="Delete"
              Icon={TrashIcon}
              onClick={() => deleteArticle(articleId)}
            />
            <Btn
              title="Edit"
              Icon={PencilAltIcon}
              onClick={() =>
                router.push({
                  pathname: `${process.env.HOST}/a/create`,
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
