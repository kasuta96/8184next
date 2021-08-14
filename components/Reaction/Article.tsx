import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Article = ({ authorId, articleId }) => {

  const router = useRouter()

  // async function publishArticle(id: number): Promise<void> {
  //   await fetch(`${process.env.NEXTAUTH_URL}/api/publish/${id}`, {
  //     method: "PUT",
  //   });
  //   await router.push("/a")
  // }
  
  async function deleteArticle(id: number): Promise<void> {

    await fetch( process.env.HOST + `/api/article/${id}`, {
      method: "DELETE",
    });
    
    await router.push("/a")
  }

  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }
  const userHasValidSession = Boolean(session);
  const articleBelongsToUser = session?.id === authorId;

  return (
    <div>
      {/* {!props.published && userHasValidSession && articleBelongsToUser && (
        <button onClick={() => publishArticle(props.id)}>Publish</button>
      )} */}
      {userHasValidSession && articleBelongsToUser && (
        <button onClick={() => deleteArticle(articleId)}>Delete</button>
      )}

    </div>
  )
}

export default Article
