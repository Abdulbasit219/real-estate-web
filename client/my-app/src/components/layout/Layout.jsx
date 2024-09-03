import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main className="h-screen">
        <div className='layout h-auto mt-24'>{children}</div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
