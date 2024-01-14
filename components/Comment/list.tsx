import { useSession } from "next-auth/react"
import FormatDate from "../handleData/FormatDate"
import Card from "./Card"

function CommentList({ comments, onDelete, deleting }) {
  const { data: session } = useSession()

  return (
    <div className="space-y-6 my-8">
      {comments.map((comment) => {
        const isAuthor = session && session.user.id === comment.user.id

        return (
          <Card
            key={comment.id}
            user={comment.user}
            text={comment.content}
            time={<FormatDate value={comment.createdAt} />}
            onDelete={isAuthor ? () => onDelete(comment) : false}
            deleting={deleting}
          />
        )
      })}
    </div>
  )
}

export default CommentList
