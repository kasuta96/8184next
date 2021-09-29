import { signIn, useSession } from "next-auth/client"
import { useEffect } from "react"

const SigninWindow = () => {
  const [session, loading] = useSession()

  useEffect(() => {
    if (!loading && !session) void signIn()
    if (!loading && session) window.close()
  }, [session, loading])

  return null
}

export default SigninWindow
