import Header from "./header";
import Footer from "./footer";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function layout() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="">
      <Header></Header>
      <main className="p-4 h-screen ">
        {userInfo ? <Outlet /> : <Navigate to="/login" />}
      </main>
      <Footer></Footer>
    </div>
  );
}
