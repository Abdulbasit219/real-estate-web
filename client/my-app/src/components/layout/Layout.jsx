// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";

// const Layout = ({ children }) => {
//   return (
//     <>
//       <div>
//         <div className="">
//           <Header />
//         </div>
//         <main className="">
//           <div className="">{children}</div>
//         </main>
//         <div className="mt-auto">
//           <Footer />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;


import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow mt-[80px]">
        <div>{children}</div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
