import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
export default function DropProfile({ isOff, userInfo }) {



    return (
        // <div

        //     className={`${isOff ? "hidden w-0 h-0" : "block transition-width ease-in duration-1000  w-max h-max bg-gray-200 space-y-6 border p-8 rounded-lg shadow-md ring-1 ring-gray-300 absolute z-40 top-12 right-0"
        //         } `}
        // >
        <div
            className={`${isOff
                    ? ' scale-0 top-4 right-4  '
                    : ' scale-100 rounded-lg '
                } ease-in-out duration-300 transition-all transform origin-top-right w-max h-max bg-gray-200 space-y-6 border p-8  shadow-md ring-1 ring-gray-300 absolute z-40 top-12 right-0`}
        >
            <img
                className="rounded-full w-20 h-20 mx-auto"
                src={userInfo?.avatar}
                alt={userInfo?.name}
                width={200}
                height={200}
            />
            <div className="text-center text-gray-500 uppercase font-semibold leading-3">
                {userInfo.name}
            </div>
            <div className="space-x-4 flex">
                <Link
                    to={"/create"}
                    className=" flex gap-1 items-center text-gray-600 font-medium ring-1 ring-gray-300   bg-gray-50 px-6 py-2 border rounded-lg hover:bg-gray-100"
                >
                    <FaPlus
                        className="text-gray-500"
                        fill="currentColor"
                        size={22}
                    />

                    <div className=""> Create Listing</div>
                </Link>
                <button
                    onClick={() => dispatch(signOutUserSuccess())}
                    className=" flex items-center gap-2 text-gray-600 font-medium ring-1 ring-gray-300   bg-gray-50 px-6 py-2 border rounded-lg hover:bg-gray-100 "
                >
                    <span> Logout</span>
                    <MdLogout className="text-gray-600" size={20} />
                </button>
            </div>
        </div>
    )
}
