import CommentForm from "./form"
import CommentList from "./list"
import useComments from "../../hooks/useComment"

function Comment(id: { id: any }) {
  const {
    text,
    setText,
    comments,
    error,
    onSubmit,
    onDelete,
    deleting,
    sending,
  } = useComments(id)

  return (
    <div className="mb-8 mt-4">
      <CommentForm
        onSubmit={onSubmit}
        text={text}
        setText={setText}
        sending={sending}
      />
      <hr />
      {!error ? (
        comments ? (
          <CommentList
            comments={comments}
            onDelete={onDelete}
            deleting={deleting}
          />
        ) : (
          "No comment yet"
        )
      ) : (
        "Can not load comments"
      )}
    </div>
  )
}

export default Comment
