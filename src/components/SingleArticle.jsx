import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { editArticle, getArticleByID } from "../utils/api";
import { SideBar } from "./SideBar";
import { Comments } from "./Comments";
import { UserContext } from "../context/UserContext";
import Alert from "react-bootstrap/Alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons/faTag";
import {
  faThumbsDown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

export const SingleArticle = () => {
  const { article_id } = useParams();
  const [singleArticle, setSingleArticle] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useContext(UserContext);
  let dateArticle;
  useEffect(() => {
    getArticleByID(article_id)
      .then((article) => {
        setSingleArticle(article);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setError("The article hasn't been found");
        } else {
          throw err;
        }
      });

    setIsLoading(false);
  }, [article_id]);

  if (singleArticle.created_at) {
    const date = new Date(singleArticle.created_at);
    dateArticle = date.toLocaleDateString();
  }

  const vote = (increment) => {
    setSingleArticle((currentArt) => {
      return { ...currentArt, votes: currentArt.votes + increment };
    });

    editArticle(singleArticle.article_id, {
      inc_votes: increment,
    })
      .then((data) => {
        setSingleArticle(data.article);
        if (Object.keys(SingleArticle).length > 0) setIsLoading(false);
      })
      .catch((err) => {
        setError("Try again, your vote couldn't be added");
        throw new Error(err.message);
      });
  };

  if (error) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Alert key="danger" variant="danger">
          {error}
        </Alert>
        <Link to="/articles" className="link-btn custom-btn ms-3 mb-2">
          Go back to articles
        </Link>
      </div>
    );
  }

  if (Object.keys(singleArticle).length > 0) {
    return (
      <div id="single-article-page">
        {isLoading ? (
          <div
            className="spinner-border text-danger text-xl-center"
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <article id={"article-" + singleArticle.article_id}>
            <h1>{singleArticle.title}</h1>
            <img
              id="featured-image"
              src={singleArticle.article_img_url}
              alt={singleArticle.title + " featured image"}
            />

            <h5>
              <FontAwesomeIcon icon={faTag} />
              &nbsp; {singleArticle.topic}
            </h5>
            <p className="meta-info">
              {singleArticle.author} | {dateArticle}
            </p>
            {!error ? (
              <p>Article votes: {singleArticle.votes}</p>
            ) : (
              setTimeout(() => {
                singleArticle.votes - 1;
              }, 1000)
            )}
            <p>
              Give us your vote:
              <button
                className="btn-hidden-design h4 up-color"
                onClick={(e) => vote(1)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>{" "}
              |
              <button
                className="btn-hidden-design h4 down-color"
                onClick={(e) => vote(-1)}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            </p>
            <div id="body">{singleArticle.body}</div>

            <Comments article_id={singleArticle.article_id} />
          </article>
        )}
        <aside>
          <SideBar topic={singleArticle.topic} />
        </aside>
      </div>
    );
  }
};
