import { useSession } from "next-auth/client"
import Spin from "../Icons/Spin"

function CommentForm({ text, setText, onSubmit, sending }) {
  const [session, loading] = useSession()

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full p-3 rounded-xl resize-y bg-gray-200 text-gray-900 placeholder-gray-500 hover:bg-gray-200 cursor-pointer focus:outline-none"
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

      <div className="mt-4">
        {session && (
          <button
            className="flex items-center py-2 px-4 rounded bg-blue-600 text-white disabled:opacity-70 hover:bg-blue-700"
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
