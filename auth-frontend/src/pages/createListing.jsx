import ProfilePic from "../components/atoms/profile-pic";
import { FaPlus, FaUpload } from "react-icons/fa6";
import { useGetAllroomsQuery } from "../slices/roomQuery";
import { useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export default function CreateListing() {
  const initalListing = {
    title: "",
    description: "",
    price: 0,
    discountedPrice: 0,
    person: 1,
    imageUrl: [],
    owner: "",
    roomType: "",
  };

  const [listing, setListing] = useState(initalListing);
  const [filePercentage, setFilePercentage] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(undefined);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setListing({ ...listing, [name]: value });
  };

  console.log(listing);

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
          console.error("Error reading file:", error);
        });
    }
  };

  const uploadImages = async (files, e) => {
    e.preventDefault(); // Fix: Change preventDefaults to preventDefault
    const uploadedUrls = [];

    if (files && files.length > 0) {
      try {
        await Promise.all(files.map((file) => handleFileUpload(file)));
      } catch (error) {
        console.error("Error uploading files:", error);
        // Handle error appropriately
      }
    }
  };

  const handleFileUpload = (file) => {
    const storage = getStorage();
    // Create the file metadata
    /** @type {any} */
    const metadata = {
      contentType: file.type,
    };
    const customeName = uniqueIdentifier + file.name;
    console.log(customeName);
    // Upload file and metadata to the object 'images/mountains.jpg'
    const storageRef = ref(storage, "images/" + customeName);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    return new Promise((resolve, reject) => {
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(progress);
          console.log("Upload is " + progress + "% done");
          setFilePercentage(progress);
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              setUploadStatus("paused");

              break;
            case "running":
              // console.log("Upload is running");
              setUploadStatus("running");
              break;
          }
        },

        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              setFileUploadError(
                " User doesn't have permission to access the object"
              );
              break;
            case "storage/canceled":
              setFileUploadError(" User canceled the upload");
              break;

            // ...

            case "storage/unknown":
              setFileUploadError(
                "Unknown error occurred, inspect error.serverResponse "
              );
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURLadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUser({ ...user, avatar: downloadURL });
            setUploadStatus("completed");
          });
        }
      );
    });
  };

  const { title, description, price, discountedPrice, person, roomType } =
    listing;
  return (
    <div className="w-full">
      <h1 className="text-xl  font-semibold mb-4">Create New Listing</h1>
      <form className=" flex gap-8 p-8 border rounded shadow-md">
        <div className="flex-1 space-y-6">
          <div className="">
            <label htmlFor="title">Title</label>
            <div className="flex">
              <input
                className="w-full border p-2 rounded-md"
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                value={description}
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
                  onChange={handleInputChange}
                  value={price}
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
                  onChange={handleInputChange}
                  value={discountedPrice}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="person">Max Allowed Person</label>
              <div className="flex">
                <input
                  className="w-full border p-2 rounded-md"
                  type="number"
                  name="person"
                  id="person"
                  min={0}
                  onChange={handleInputChange}
                  value={person}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="roomType">Room Type</label>
              <div className="w-full border p-2 rounded-md">
                <select
                  onChange={handleInputChange}
                  className=" "
                  name="roomtype"
                  defaultValue={roomType}
                >
                  <option>----Select----</option>
                  <option value="Ac">Ac</option>
                  <option value="Non-Ac">Non-Ac</option>
                </select>
              </div>
            </div>
          </div>
          <div className="image-section  min-h-max h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full border-2 border-slate-400 border-dashed">
            {previewUrls.length
              ? previewUrls.map((url, i) => {
                  return (
                    <img
                      className="object-cover w-full h-48 rounded-lg ring-1 ring-gray-300"
                      key={i}
                      src={url}
                      alt="img"
                    />
                  );
                })
              : null}

            <div
              onClick={() => fileRef.current.click()}
              title="Add Image"
              className=" h-48 rounded-lg cursor-pointer bg-slate-200 grid place-items-center"
            >
              <div className="relative block">
                <div className="bg-gray-400 hover:rotate-90 hover:shadow-md transition-all w-min mx-auto p-4 rounded-full  ">
                  <FaPlus size={30} className="text-slate-600 " />
                </div>
                <span className="leading-loose">
                  {" "}
                  Add {previewUrls.length > 0 && "more "} images
                </span>
              </div>

              <input
                onChange={handleImageChange}
                ref={fileRef}
                className="hidden"
                type="file"
                accept="image/*"
                multiple
              />
            </div>
            {previewUrls.length > 0 && (
              <div
                onClick={uploadImages}
                title="Upload Images"
                className="cursor-pointer h-48 group rounded-lg bg-green-200 grid place-items-center"
              >
                <div>
                  <div className="bg-green-400  group mx-auto   w-min p-4 rounded-full ">
                    <FaUpload
                      size={30}
                      className="text-green-800  transform transition-transform group-hover:-translate-y-2  "
                    />
                  </div>
                  <span className="leading-loose">Upload Image</span>
                </div>
              </div>
            )}
          </div>

          <button
            className="w-full bg-gray-600 text-gray-300 text-xl p-4 rounded-lg"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
