import { Outlet } from "react-router-dom";
import Sidebar from "./pages/auth/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Sidebar />
      <main className="py-3">
        <Outlet />
      </main>
    </>
  );
};

export default App;
