import React, { ReactNode } from "react"
import Header from "./layouts/Header"
import Sidebar from "./layouts/Sidebar"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <>
    <div className="w-full max-w-8xl mx-auto">
      <div className="md:flex">
        <Sidebar />

        <main id="content-wrapper" className="min-w-0 w-full flex-auto md:static md:max-h-full md:overflow-visible">
          <Header />
          <div className="w-full flex">{props.children}</div>
        </main>
      </div>
    </div>
  </>
)

export default Layout
