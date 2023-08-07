import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Thread } from "../components";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [post]);
  return (
    <div className="container max-w-[620px] flex items-center m-auto">
      <Thread post={post} options={false} />
    </div>
  );
};

export default PostDetail;
