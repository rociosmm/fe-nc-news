import { faTag } from "@fortawesome/free-solid-svg-icons/faTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { capitalizeString } from "../../utils/helpers";

export const LastArticleCard = ({ article }) => {
  console.log("article LastArticleCard :>> ", article);
  return (
    <article className="last-news-sidebar">
      <div className="feature-img">
        <img
          src={article.article_img_url}
          alt={`Feature image for ${article.title}`}
        />
      </div>
      <div className="text">
        <h3 className="h3">{article.title}</h3>
        <p>
          <FontAwesomeIcon icon={faTag} /> &nbsp;
          {capitalizeString(article.topic)}
        </p>
      </div>
    </article>
  );
};
