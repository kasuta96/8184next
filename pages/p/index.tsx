import Head from 'next/head';
import Feed from '../../components/Feeds/Feed';
import Layout from '../../components/Layout';

export default function Home() {
  // const [session, loading] = useSession()
  // if (!session) return <Login />;

  return (
    <>
      <Head>
        <title>8184 - NewsFeed</title>
      </Head>
      <Layout>
        <Feed />
      </Layout>
    </>
  )
}

// export async function getServerSideProgs(context) {
//   // Get user
//   const session = await getSession(context);
//   return {
//     progs: {
//       session
//     }
//   }
// }