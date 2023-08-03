import React, { useEffect, useState } from "react";
import { Thread } from "../components";

import { Spinner } from "flowbite-react";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/allpost", {
      headers: {
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  if (!data.length) {
    return (
      <div className="container max-w-[620px] h-screen flex items-center justify-center m-auto">
        <div
          className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container max-w-[620px] m-auto">
      {data?.map((post) => (
        <Thread
          key={post._id}
          post={post}
          data={data}
          setData={setData}
          comments={post.comments.postedBy}
        />
      ))}
    </div>
  );
};

export default Home;
