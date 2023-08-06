import { Outlet } from "react-router-dom";

const Navbar = () => {
    return ( 
      <div>
<header className="text-black body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center bg-indigo-900">
        <a href="/" className="flex title-font items-center text-white mb-4 md:mb-0 font-bold">
          <span className="ml-3 text-xl">RESTAUGRAM</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <a href="/" className="mr-5 text-white hover:text-black hover:bg-amber-500 p-2 transition-all ease-in-out rounded-lg font-bold">
              HOME
            </a>
            <a href="/Register" className="mr-5 text-white hover:text-black hover:bg-amber-500 p-2 transition-all ease-in-out rounded-lg font-bold">
              ADD
            </a>
            <Outlet />
        </nav>
      </div>
      </header>
      </div>
     );
}
 
export default Navbar;