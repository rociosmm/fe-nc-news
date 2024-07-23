import { faTag } from "@fortawesome/free-solid-svg-icons/faTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { capitalizeString } from "../../utils/helpers";
import { Link } from "react-router-dom";

export const LastArticleCard = ({ article }) => {
  return (
    <article className="last-news-sidebar">
        <div className="feature-img">
          <img
            src={article.article_img_url}
            alt={`Feature image for ${article.title}`}
          />
        </div>
        <div className="text">
        <Link className="last-article-link" to={`/blog/${article.article_id}`} title={`Read ${article.title}`}>
          <h3 className="h3">{article.title}</h3></Link>
          <p><span className="topic-in-card">
            <FontAwesomeIcon icon={faTag} /> &nbsp;
            {capitalizeString(article.topic)}</span>
          </p>
        </div>
      </article>
  );
};
