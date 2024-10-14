import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";


const Home = () => {

  return (
    <div>

    <section className="flex gap-6 w-full">

       <div className="w-2/12">
          <Sidebar/>
       </div>
      <div className="m-3 text-xl text-gray-900 font-semibold w-10/12 overflow-y-auto" style={{ maxHeight: '768px' }}>
        <Outlet/>
      </div>
    </section>
    </div>
  );
};

export default Home