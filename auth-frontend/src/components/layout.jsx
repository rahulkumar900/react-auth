import Header from "./header";
import Footer from "./footer";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function layout() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="box-border flex flex-col">
      <Header />

      <main className="px-4  w-full  mx-auto">
        <div className="max-w-5xl mx-auto ">
          <div className="h-5"></div>
          {userInfo ? <Outlet /> : <Navigate to="/login" />}
        </div>
      </main>
    </div>
  );
}
