import React from "react";

export default function ProfilePic({
  className = "",
  avatar = null,
  alt = "",
  placeholder = "R",
  handleClick = (f) => f,
}) {
  return (
    <>
      {!avatar ? (
        <div
          className={`${className}  bg-slate-500 inline-flex items-center justify-center`}
        >
          {placeholder}
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