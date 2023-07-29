import React, { useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatPost = ({ setModal }) => {
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      fetch("http://localhost:5000/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Sammi " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body: body,
          photo: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          } else {
            toast.success("Success");
            navigate("/");
          }
        });
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "mern-project");
    data.append("cloud_name", "dhv4bjkxh");
    fetch("https://api.cloudinary.com/v1_1/dhv4bjkxh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileChange = (event) => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };
  return (
    <div className="absolute top-20">
      <ToastContainer />

      <div className="w-[620px] shadow-2xl  bg-gray-900 rounded-2xl transform ">
        <section className="p-3 border-b border-gray-600">
          <svg
            onClick={() => setModal(false)}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600 hover:text-blue-400 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroklinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </section>
        <section className="w-full flex px-3 py-2">
          <div className="mr-1">
            <img
              className="w-10 rounded-full"
              src="/user.jpg"
              alt="Profile Picture"
            />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full p-2 bg-transparent outline-none placeholder-gray-400 text-white resize-none focus:border-none border-none"
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="What's happening?"
            ></textarea>
            <div className="mt-1 mb-3">
              <img className="rounded-lg" src={selectedFile} alt="" />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              {/* <div class="flex"></div> */}
              <div className="">
                <button type="button" className="btn-warning">
                  <BsImageFill />
                  <input type="file" onChange={handleFileChange} />
                </button>
              </div>
              <div>
                <button
                  onClick={() => postDetails()}
                  className="transition duration-500 ease-in-out bg-blue-500 bg-opacity-50 hover:bg-opacity-100 text-white text-opacity-50 hover:text-opacity-100 py-2 px-3 rounded-full text-base font-bold focus:outline-none"
                >
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
