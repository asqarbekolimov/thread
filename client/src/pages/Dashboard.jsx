import React, { useContext, useEffect, useState } from "react";
import { CreatPost, Thread } from "../components";
import { MdOutlineCreate } from "react-icons/md";
import { AiOutlineUserDelete } from "react-icons/ai";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const [profile, setProfile] = useState([]);
  const handleModal = (item) => {
    setModal(item);
  };

  useEffect(() => {
    fetch("http://localhost:5000/mypost", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.myPost);
      });
  }, []);
  console.log(profile);
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
        <div className="flex justify-between">
          <button
            onClick={() => setModal(true)}
            className="flex items-center gap-1 my-5 bg-blue-600 py-1 px-3 rounded-md"
          >
            <MdOutlineCreate /> Add Post
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/auth");
            }}
            className="flex items-center gap-1 my-5 bg-red-600 py-1 px-3 rounded-md"
          >
            <AiOutlineUserDelete /> <span>Log Out</span>
          </button>
        </div>
      </div>
      {modal ? (
        <CreatPost handleModal={handleModal} setModal={setModal} />
      ) : null}
      {profile.map((data) => (
        <Thread key={data._id} post={data} />
      ))}
    </div>
  );
};

export default Dashboard;
