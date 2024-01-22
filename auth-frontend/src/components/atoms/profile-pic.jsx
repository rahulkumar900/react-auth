import React from "react";

export default function ProfilePic({
  className = "",
  avatar = null,
  alt = "",
  placeholder = "R",
  userName="",
  handleClick = (f) => f,
  profileName = "",
  onClick = (f) => f,
}) {
  const firstName = (name) => name.charAt(0).toUpperCase();

  return (
    <div className= {`${className} overflow-hidden   `} onClick={onClick}>
      {!avatar ? (
        <div
          className={` w-full h-full  inline-flex items-center justify-center`}
        >
          {firstName(profileName) || placeholder}
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
    </div>
  );
}
