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

      <main className="p-4">
        {userInfo ? <Outlet /> : <Navigate to="/login" />}
      </main>
    </div>
  );
}
