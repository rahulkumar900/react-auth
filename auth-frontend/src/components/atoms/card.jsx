import React from "react";
import Rating from "./rating";

export default function card({
  title,
  description,
  imageUrl,
  price,
  discountedPrice,
  rating,
}) {
  return (
    <div className="rounded-md border flex flex-col md:flex-row  overflow-hidden">
      <div className="w-full md:w-0   bg-gray-500 h-0  md:pr-[30%] md:h-auto md:min-h-[60px] relative pt-[60%] md:pt-0 block ">
        <img
          src={imageUrl}
          width="100%"
          height="auto"
          alt="img"
          loading="lazy"
          className="absolute top-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-3 gap-4 flex w-full flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p>{description}</p>
        </div>
        <div className="flex justify-between">
          <div>
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
          <div className="items-center flex ">
            <div className="px-4 py-2 bg-green-600 text-green-100 border rounded-md  ">
              Book Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
