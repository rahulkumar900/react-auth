import ProfilePic from "../components/atoms/profile-pic";
import { FaPlus } from "react-icons/fa6";
import { useGetAllroomsQuery } from "../slices/roomQuery";
import { useRef, useState } from "react";

export default function CreateListing() {
  const fileRef = useRef();
  const [files, setFile] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleImageChange = (e) => {
    const newFiles = Array.from(e.target.files);
  
    if (newFiles.length > 0) {
      setFile((prevFiles) => [...prevFiles, ...newFiles]);
  
      const promises = newFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });
  
      Promise.all(promises)
        .then((results) => {
          setPreviewUrls((prevUrls) => [...prevUrls, ...results]);
        })
        .catch((error) => {
          console.error('Error reading file:', error);
        });
    }
  };

  console.log(previewUrls)



  return (
    <div className="w-full">
      <h1 className="text-xl  font-semibold mb-4">Create New Listing</h1>
      <form className=" flex gap-8 p-8 border rounded shadow-md">
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
          <div className="md:flex justify-between gap-4">
            <div className="">
              <label htmlFor="price">Price</label>
              <div className="flex">
                <input
                  className="w-full border p-2 rounded-md"
                  type="number"
                  name="price"
                  id="price"
                  min={0}
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
                  min={0}
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
                  min={0}

                />
              </div>
            </div>
          </div>
          <div onClick={() => fileRef.current.click()} className="image-section flex  flex-wrap gap-4 h-32 w-full border-2 border-slate-400 border-dashed">

            {
              previewUrls.length ? previewUrls.map((url, i) => {
                return (<img src={url} width={200} height={200} alt="img" />)
              }) : null
            }


            <div title="Add Image" className="w-full h-full cursor-pointer bg-slate-50 grid place-items-center">
              <div className="bg-gray-400 w-min p-2 rounded-full ring-1 drop-shadow-md ring-slate-200">
                <FaPlus size={30} className="text-slate-600 " />
              </div>
              <input onChange={handleImageChange} ref={fileRef} className="hidden" type="file" accept="image/*" multiple />
            </div>
          </div>
          <button type="submit">Create</button>
        </div>

      </form>
    </div>
  );
}
