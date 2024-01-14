import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react"

const SigninWindow = () => {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  useEffect(() => {
    if (!loading && !session) void signIn()
    if (!loading && session) window.close()
  }, [session, loading])

  return null
}

export default SigninWindow
