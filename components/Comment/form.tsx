import { useSession } from "next-auth/client"
import Spin from "../Icons/Spin"
import useTrans from "../../hooks/useTrans"

function CommentForm({ text, setText, onSubmit, sending }) {
  const { t } = useTrans()
  const [session, loading] = useSession()

  // autogrow textarea
  function autoGrow(e: any) {
    e.style.height = "auto"
    e.style.height = e.scrollHeight + "px"
  }

  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="flex w-full p-3 rounded-xl resize-none bg-200 text-900 placeholder-gray-400 cursor-pointer focus:outline-none"
        rows={2}
        placeholder={session ? t("a", "What are your thoughts?") : t("a", "Please login to leave a comment")}
        onChange={(e) => {
          setText(e.target.value)
          autoGrow(e.target)
        }}
        value={text}
        disabled={!session}
      ></textarea>

      <div className="mt-4 mb-8">
        {session && (
          <button className="btn bg-blue-600 text-white" disabled={!text || sending}>
            {t("primary", "Send")} {sending && <Spin className="ml-3" />}
          </button>
        )}
      </div>
    </form>
  )
}

export default CommentForm
