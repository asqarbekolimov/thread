import React, { useContext, useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { LuRepeat2, LuSend } from "react-icons/lu";
import { UserContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
import Comment from "../comment/comment";

const Thread = ({ post, data, setData, options = true }) => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const likePost = (id) => {
    fetch("http://localhost:5000/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unLikePost = (id) => {
    fetch("http://localhost:5000/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const commentPost = (text, postId) => {
    fetch("http://localhost:5000/comments", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Sammi " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // navigate(0);
        const newData = data.map((item) => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex gap-4 border-y border-solid dark:border-gray-100/20 py-6">
      <div className="w-14">
        <img className="rounded-full w-14" src="/user.jpg" alt="" />
      </div>
      <div>
        <div className="hover:underline cursor-pointer font-semibold mb-2">
          {post?.postedBy?.name}
        </div>
        <p className="text-base text-justify mb-3">{post?.body}</p>
        <img className="w-[550px] rounded-xl mb-5" src={post?.photo} alt="" />
        <div className={`${options ? "flex items-center gap-5" : "hidden"} `}>
          <div className="flex items-center gap-1">
            {post.likes?.includes(state._id) ? (
              <AiFillHeart
                onClick={() => unLikePost(post._id)}
                className="text-2xl cursor-pointer text-red-600"
              />
            ) : (
              <AiOutlineHeart
                onClick={() => likePost(post._id)}
                className="text-2xl cursor-pointer"
              />
            )}

            <span className="text-sm text-gray-400">{post.likes?.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <Link to={`/posts/${post._id}`}>
              <FaRegComment className="text-xl cursor-pointer" />
            </Link>
            <span className="text-sm text-gray-400">
              {post.comments?.length}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <LuRepeat2 className="text-2xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
          </div>
          <div className="flex items-center gap-1">
            <LuSend className="text-xl cursor-pointer" />
            <span className="text-sm text-gray-400">110</span>
          </div>
        </div>
        {!options ? <Comment commentPost={commentPost} id={post._id} /> : null}
        {!options ? (
          <div>
            {post?.comments?.map((item) => (
              <article
                key={item._id}
                className="p-6 my-1 text-base bg-white rounded-lg dark:bg-gray-900"
              >
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <img
                        className="mr-2 w-6 h-6 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt="Michael Gough"
                      />
                      {item.postedBy.name}
                    </p>
                    {/* <p class="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        pubdate
                        datetime="2022-02-08"
                        title="February 8th, 2022"
                      >
                        Feb. 8, 2022
                      </time>
                    </p> */}
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">{item.text}</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Thread;
