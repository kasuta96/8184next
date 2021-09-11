import { useSession } from "next-auth/client"
import { formatDaysAgo } from "../../lib/formatDaysAgo"
import Card from "./Card"

function CommentList({ comments, onDelete, deleting }) {
  const [session, loading] = useSession()

  return (
    <div className="space-y-6 my-8">
      {comments.map((comment) => {
        const isAuthor = session && session.user.id === comment.user.id

        return (
          <Card
            key={comment.id}
            user={comment.user}
            text={comment.content}
            time={formatDaysAgo(comment.createdAt)}
            onDelete={isAuthor ? () => onDelete(comment) : false}
            deleting={deleting}
          />
        )
      })}
    </div>
  )
}

export default CommentList
