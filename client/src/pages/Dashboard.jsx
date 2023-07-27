import React from "react";
import { Thread } from "../components";

const Dashboard = () => {
  return (
    <div className="container max-w-[620px] m-auto">
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
      </div>
      <Thread />
      <Thread />
    </div>
  );
};

export default Dashboard;
