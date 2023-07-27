import React, { useState } from "react";
import { BsImageFill } from "react-icons/bs";

const CreatPost = ({ setModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  console.log(selectedFile);
  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
  };
  return (
    <div className="absolute top-20">
      <div class="w-[620px] shadow-2xl  bg-gray-900 rounded-2xl transform ">
        <section class="p-3 border-b border-gray-600">
          <svg
            onClick={() => setModal(false)}
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-600 hover:text-blue-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </section>
        <section class="w-full flex px-3 py-2">
          <div class="mr-1">
            <img
              class="w-10 rounded-full"
              src="/user.jpg"
              alt="Profile Picture"
            />
          </div>
          <div class="flex-1">
            <textarea
              class="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-white resize-none focus:border-none border-none"
              rows="4"
              placeholder="What's happening?"
            ></textarea>
            <div className="mt-1 mb-3">
              <img className="rounded-lg" src={selectedFile} alt="" />
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-gray-700">
              {/* <div class="flex"></div> */}
              <div className="">
                <button type="button" class="btn-warning">
                  <BsImageFill />
                  <input type="file" onChange={handleFileChange} />
                </button>
              </div>
              <div>
                <button class="transition duration-500 ease-in-out bg-blue-500 bg-opacity-50 hover:bg-opacity-100 text-white text-opacity-50 hover:text-opacity-100 py-2 px-3 rounded-full text-base font-bold focus:outline-none">
                  Thread
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreatPost;
