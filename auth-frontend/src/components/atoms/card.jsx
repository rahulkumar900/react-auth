import React from "react";
import Rating from "./rating";

export default function card({
  title,
  imageUrl,
  price,
  discountedPrice,
  rating,
}) {
  return (
    <div className="rounded-md border   overflow-hidden">
      <img src={imageUrl} alt={title} width={"100%"} height={"100%"} />
      <div className="p-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div>
          <Rating rating={rating} />
        </div>
        <div>
          <div>
            {" "}
            <span className="text-gray-500 font-medium line-through">
              {price}
            </span>
            <span className="text-lg font-semibold">
              {" "}
              &#8377;{discountedPrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
