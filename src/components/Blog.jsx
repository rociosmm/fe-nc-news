import React, { useState, useEffect, useContext } from "react";
import { ArticleCard } from "./designComponents/ArticleCard";
import { getArticles } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { capitalizeString } from "../utils/helpers";

export const Blog = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useContext(UserContext);
  const [params, setParams] = useState({
    sort_by: "created_at",
    order: "desc",
	  topic: topic ? topic : null,
	  limit: 9,
	  p: page
  });

  useEffect(() => {
    getArticles(params).then(({ articles }) => {
      setArticles(articles);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getArticles(params).then(({ articles }) => {
      setArticles(articles);
      if (articles.length > 0) {
        setIsLoading(false);
      }
    });
  }, [params]);

  const handleSort = (e) => {
    const { name, value } = e.target;
    setParams((current) => {
      return { ...current, [name]: value };
    });
  };

  const handleOrder = (e) => {
    const { name, value } = e.target;
    setParams((current) => {
      return { ...current, [name]: value };
    });
  };
  return (
    <main className="mt-5">
      {topic ? <h1>NC News - {capitalizeString(topic)} </h1> : <h1>NC News</h1>}

      {isLoading ? (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <>
          <section id="filter" className="me-5 mb-2">
            <label>
              Sort by:
              <Form.Select
                name="sort_by"
                id="sort_by"
                onChange={handleSort}
                defaultValue={params.sort_by}
              >
                <option value="created_at">Date</option>
                <option value="votes">Votes</option>
                <option value="comment_count">Number of Comments</option>
              </Form.Select>
            </label>
            <label className="ms-3">
              Order:
              <Form.Select
                name="order"
                id="order"
                onChange={handleOrder}
                defaultValue={params.order}
              >
                <option value="desc">Descendant</option>
                <option value="asc">Ascendent</option>
              </Form.Select>
            </label>
          </section>
          <section id="articles-list">
            {articles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </section>
        </>
      )}
    </main>
  );
};
