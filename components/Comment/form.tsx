import { useSession } from "next-auth/client"
import Spin from "../Icons/Spin"

function CommentForm({ text, setText, onSubmit, sending }) {
  const [session, loading] = useSession()

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full p-3 rounded-xl resize-y bg-200 text-900 placeholder-gray-400 cursor-pointer focus:outline-none"
        rows={2}
        placeholder={
          session
            ? `What are your thoughts?`
            : "Please login to leave a comment"
        }
        onChange={(e) => setText(e.target.value)}
        value={text}
        disabled={!session}
      />

      <div className="mt-4 mb-8">
        {session && (
          <button
            className="btn bg-blue-600 text-white"
            disabled={!text || sending}
          >
            Send {sending && <Spin className="ml-3" />}
          </button>
        )}
      </div>
    </form>
  )
}

export default CommentForm
