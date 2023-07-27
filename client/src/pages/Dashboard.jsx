import React, { useState } from "react";
import { CreatPost, Thread } from "../components";
import { MdOutlineCreate } from "react-icons/md";

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const handleModal = (item) => {
    setModal(item);
  };
  console.log(modal);
  return (
    <div className="container max-w-[620px] m-auto relative">
      <div className="my-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold"> Asqarbek Olimov</h1>
            <div>mr_asqarbek</div>
          </div>
          <img className="rounded-full w-20" src="/user.jpg" alt="" />
        </div>
        <div className="my-5">
          <p className="text-base font-normal">
            🚀 Follow my journey and discover the essential tools and strategies
            to make it happen.
          </p>
        </div>
        <div>
          <span className="text-base text-gray-500 font-normal cursor-pointer hover:underline">
            43 followers
          </span>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-1 my-5 bg-blue-600 py-1 px-3 rounded-md"
        >
          <MdOutlineCreate /> Add Post
        </button>
      </div>
      {modal ? (
        <CreatPost handleModal={handleModal} setModal={setModal} />
      ) : null}
      <Thread />
      <Thread />
    </div>
  );
};

export default Dashboard;
