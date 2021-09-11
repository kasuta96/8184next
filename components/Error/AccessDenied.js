import { signIn } from 'next-auth/client'

export default function AccessDenied () {
  return (
    <section className="flex-grow min-h-screen p-5 mx-auto">
      <div className="lg:max-w-3xl mx-auto text-center">

        <h1>Access Denied</h1>
        <p>
          <a href="/api/auth/signin"
            onClick={(e) => {
            e.preventDefault()
            signIn()
          }}>You must be signed in to view this page</a>
        </p>
      </div>
    </section>
  )
}