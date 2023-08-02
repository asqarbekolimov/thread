import React from "react";

const Comment = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 rounded-md">
      <div className="max-w-2xl mx-auto px-4">
        <form className="mb-0">
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="6"
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="button"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
          >
            Post comment
          </button>
        </form>
      </div>
    </section>
  );
};

export default Comment;
