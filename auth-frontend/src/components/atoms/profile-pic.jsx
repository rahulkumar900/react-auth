import React from "react";

export default function ProfilePic({
  className = "",
  avatar = null,
  alt = "",
  placeholder = "R",
  userName="",
  handleClick = (f) => f,
  
}) {

  const firstText = x => x.charAt(0);
  console.log(firstText("Rahu"));
  return (
    <>
      {!avatar ? (
        <div
          className={`${className}  bg-slate-500 inline-flex items-center justify-center`}
        >
          {firstText(userName) || placeholder}
        </div>
      ) : (
        <img
          className={`${className}`}
          width="40px"
          height="40px"
          src={avatar}
          alt="avatar"
        />
      )}
    </>
  );
}
