import React, { useEffect, useState } from "react";
import { getArticles, getTopics } from "../utils/api";
import { LastArticleCard } from "./LastArticleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons/faTag";
import { capitalizeString } from "../utils/helpers";
import { Link } from "react-router-dom";

export const SideBar = ({ topic }) => {
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getArticles({ topic: topic, limit: 3 }).then(({ articles }) => {
      setArticles(articles);
    });

    getTopics().then((topics) => {
      setTopics(topics);
    });
  }, []);

  console.log("articles retrieved :>> ", articles);

  return (
    <>
      <h2>Related news</h2>
      <section id="last-news">
        {articles.map((article) => {
          return <LastArticleCard key={article.article_id} article={article} />;
        })}
      </section>
      <section id="topics-list">
        <h2>Topics</h2>
        <ul>
          {topics.map((topic) => {
            return (
              <li key={topic.slug}>
                <Link to={`/blog/topics/${topic.slug}`}>
                  <FontAwesomeIcon icon={faTag} /> &nbsp;
                  {capitalizeString(topic.slug)}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};
