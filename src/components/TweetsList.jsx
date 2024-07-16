import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../utils/convertTime";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { deleteTweets, updateTweets } from "../redux/thunks/tweets";
import DeleteConfirmation from "./DeleteConfirmation";
import Edit from "../components/Edit";
import Like from "../components/Like";

const TweetsList = ({
  tweetId,
  avatar,
  username,
  createdAt,
  content,
  likesCount,
  isLiked,
}) => {
  const secondAvatar = useSelector((state) => state.user?.profileData?.avatar);
  const authUsername = useSelector((state) => state.auth?.user?.username);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditTweet = (editedContent) => {
    dispatch(updateTweets({ tweetId, content: editedContent }));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteTweet = () => {
    dispatch(deleteTweets(tweetId));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      isOpen: false,
      delete: false,
    }));
  };

  return (
    <>
      <div className="text-white w-full flex justify-start items-center sm:gap-5 gap-3 border-b border-slate-600 p-3 sm:p-5">
        <div className="w-10">
          <img
            src={avatar || secondAvatar}
            className="w-8 h-8 object-cover rounded-full"
          />
        </div>
        <div className="w-full flex flex-col gap-1 relative">
          <div className="flex items-center gap-2">
            <h2 className="text-xs">{username}</h2>
            <span className="text-xs text-slate-400">{timeAgo(createdAt)}</span>
          </div>
          {editState.editing ? (
            <Edit
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditTweet}
            />
          ) : (
            editState.editedContent
          )}
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            tweetId={tweetId}
            size={20}
          />
          {authUsername === username && (
            <div>
              <HiOutlineDotsVertical
                onClick={() =>
                  setEditState((prevState) => ({
                    ...prevState,
                    isOpen: !prevState.isOpen,
                  }))
                }
              />
            </div>
          )}
          {editState.isOpen && (
            <div className="border bg-[#222222] text-lg border-slate-600 absolute text-center right-5 rounded-xl">
              <ul>
                <li
                  className="hover:opacity-50 px-5 cursor-pointer border-b border-slate-600"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      editing: !prevState.editing,
                      isOpen: false,
                    }))
                  }
                >
                  Edit
                </li>
                <li
                  className="px-5 hover:opacity-50 cursor-pointer"
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      delete: true,
                      isOpen: false,
                    }))
                  }
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
          {editState.delete && (
            <DeleteConfirmation
              tweet={true}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: !prevState.delete,
                }))
              }
              onDelete={handleDeleteTweet}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TweetsList;

