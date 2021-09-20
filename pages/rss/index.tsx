import Head from "next/head"
import Feed from "./Feed"
import Layout from "../../components/Layout"

export default function Home() {
  // const [session, loading] = useSession()
  // if (!session) return <Login />;

  return (
    <>
      <Head>
        <title>8184 - Rss Feed</title>
      </Head>
      <Layout>
        <div className="space-y-8 py-10 w-full max-w-4xl mx-auto">
          <Feed />
        </div>
      </Layout>
    </>
  )
}
