import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
export default function Rating({ rating = 0 }) {
  return (
    <div className="inline-flex items-center gap-2 ">
      <span>{rating} of 5</span>
      <div className="inline-flex">
        {[...Array(5)].map((el, i) => (
          <FaStar key={i} fill={rating > i ? "gold" : "gray"} />
        ))}
      </div>
    </div>
  );
}
