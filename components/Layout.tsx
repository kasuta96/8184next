import React, { ReactNode } from "react"
import Header from "./layouts/Header"
import Sidebar from "./layouts/Sidebar"

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <>
    <Header />
      <main className="relative md:flex bg-gray-100">
        <Sidebar />

        {props.children}
        
      </main>
  </>
);

export default Layout;
