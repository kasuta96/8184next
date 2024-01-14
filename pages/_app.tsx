import "../styles/globals.css"
import "../styles/photoswipe.css"
import NProgress from "nprogress"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { ThemeProvider } from "next-themes"
import type { AppProps /*, AppContext */ } from "next/app"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }

    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class" defaultTheme="system">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
