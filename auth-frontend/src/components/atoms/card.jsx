import React from "react";

export default function card({
  title,
  imageUrl,
  price,
  discountedPrice,
  rating,
}) {
  return (
    <div>
      <img src={imageUrl} alt={title} width={500} height={500} />
      <div>
        <h3>{title}</h3>
        <span>
          {price}
          {discountedPrice}
        </span>
        <div>{rating}</div>
      </div>
    </div>
  );
}
