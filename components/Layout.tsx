import React, { ReactNode } from "react"
import Header from "./layouts/Header"
import Sidebar from "./layouts/Sidebar"

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Header />
    {/* <main className="relative md:flex bg-gray-100"> */}
    <div className="w-full max-w-8xl mx-auto">
      <div className="md:flex">

        <Sidebar />

        <div id="content-wrapper" className="min-w-0 w-full flex-auto md:static md:max-h-full md:overflow-visible bg-gray-100">
          <div className="w-full flex">

            {props.children}

          </div>
        </div>


      </div>
    </div>
  </>
);

export default Layout;
