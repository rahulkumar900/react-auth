import ProfilePic from "../components/atoms/profile-pic";

import { useGetAllroomsQuery } from "../slices/roomQuery";

export default function CreateListing() {
  return (
    <div className="w-full">
      <h1 className="text-xl  font-semibold mb-4">Create New Listing</h1>
      <form className=" flex gap-8">
        <div className="flex-1 space-y-6 ">
          <div className="">
            <label htmlFor="title">Title</label>
            <div className="flex">
              <input
                className="w-full border p-2 rounded-md"
                type="text"
                name="title"
                id="title"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="description">Description</label>
            <div>
              <textarea
                className="w-full h-32 border p-2 rounded-md"
                type="text"
                name="description"
                id="description"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="price">Price</label>
            <div className="flex">
              <input
                className="w-full border p-2 rounded-md"
                type="number"
                name="price"
                id="price"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="discounted-price">Discounted Price</label>
            <div className="flex">
              <input
                className="w-full border p-2 rounded-md"
                type="number"
                name="discountedPrice"
                id="discounted-price"
              />
            </div>
          </div>
          <div className="">
            <label htmlFor="person">Max Allowed Person</label>
            <div className="flex">
              <input
                className="w-full border p-2 rounded-md"
                type="number"
                name="dperson"
                id="person"
              />
            </div>
          </div>
          <button type="submit">Create</button>
        </div>
        <div className="image-section space-y-5">
          {[...Array(4)].map((el) => (
            <img
              className="bg-gray-200"
              src=""
              width={100}
              height={100}
              alt="img"
            />
          ))}
        </div>
      </form>
    </div>
  );
}
