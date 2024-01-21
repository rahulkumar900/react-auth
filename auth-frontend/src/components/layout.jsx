import Header from "./header";
import { useEffect, useState } from "react";
import Footer from "./footer";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
// import {useOnline} from 'react-use'
export default function Layout() {

  const [online, setOnline] = useState(typeof window !== "undefined" ? navigator.onLine : true)



  useEffect(() => {
    // create event handler
    const handleStatusChange = () => {
      setOnline(navigator.onLine);
    };

    // listen for online and ofline event
    window.addEventListener("online", handleStatusChange);
    window.addEventListener("offline", handleStatusChange);

    // clean up to avoid memory-leak
    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, []);


  useEffect(() => {
    console.log(online)
  }, [online])



  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="box-border flex flex-col ">
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
