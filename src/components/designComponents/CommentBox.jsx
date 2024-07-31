import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../context/UserContext";
import { deleteCommentReq } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons/faThumbsUp";
import { faThumbsDown } from "@fortawesome/free-solid-svg-icons/faThumbsDown";

export const CommentBox = ({ comment, commentDate, newClass = "" }) => {
  const { username } = useContext(UserContext);
  const [successMsg, setSuccessMsg] = useState("");
  const [currentComment, setCurrentComment] = useState({});

  useEffect(() => {
    setCurrentComment(comment);
  }, []);

  const deleteComment = (comment_id) => {
    deleteCommentReq(comment_id).then((msg) => {
      console.log("msg :>> ", msg);
    });
    setCurrentComment({});
    setSuccessMsg("Comment deleted");
    setTimeout(() => setSuccessMsg(""), 2000);
  };

  if (successMsg === "" && Object.keys(currentComment).length > 0) {
    return (
      <article className={"comment " + newClass}>
        <div className="comment-data">
          <p className="fw-bold mb-1">{currentComment.author}:</p>
          <p>{currentComment.body}</p>
          <p>
            {commentDate} | Votes: {currentComment.votes} — Is it useful for
            you?{" "}
            <button className="btn-hidden-design">
              <FontAwesomeIcon icon={faThumbsUp} />{" "}
            </button>{" "}
            |
            <button className="btn-hidden-design">
              <FontAwesomeIcon icon={faThumbsDown} />{" "}
            </button>
          </p>
        </div>
        <div className="delete-comment">
          {username === currentComment.author ? (
            <Button
              variant="danger"
              onClick={(e) => deleteComment(currentComment.comment_id)}
            >
              <b>X Delete</b>
            </Button>
          ) : null}
        </div>
      </article>
    );
  } else if (successMsg !== "") {
    return (
      <article className={"comment " + newClass}>
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      </article>
    );
  } else {
    return null;
  }
};
