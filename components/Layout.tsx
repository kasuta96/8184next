import React, { ReactNode } from "react"
import Footer from "./layouts/Footer"
import Header from "./layouts/Header"
import SidebarLink from "./layouts/SidebarLink"

type Props = {
  children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
  <>
    <div className="w-full max-w-8xl mx-auto">
      <div className="md:flex">
        <SidebarLink />

        <main id="content-wrapper" className="min-w-0 w-full flex-auto md:static md:max-h-full md:overflow-visible">
          <Header />
          <div className="w-full min-h-screen flex">{props.children}</div>
          <Footer />
        </main>
      </div>
    </div>
  </>
)

export default Layout
