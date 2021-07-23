import Head from 'next/head';
import Feed from '../components/Feeds/Feed';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function Home() {
  // const [session, loading] = useSession()
  // if (!session) return <Login />;

  return (
    <>
      <Head>
        <title>FB</title>
      </Head>
      <Header />
      <main className="relative md:flex bg-gray-100">

        <Sidebar />
        <Feed />

        {/* Widgets */}

      </main>
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