import React, { useState, useEffect, useContext, useRef } from "react";
import { ArticleCard } from "./designComponents/ArticleCard";
import { getArticles } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { capitalizeString } from "../utils/helpers";
import { Button } from "react-bootstrap";

export const Blog = () => {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { username } = useContext(UserContext);
  const loadMoreButtonRef = useRef(null);
  const [more, setMore] = useState(true);
  const [params, setParams] = useState({
    sort_by: "created_at",
    order: "desc",
    topic: topic ? topic : null,
    limit: 9,
    p: 1,
  });

  useEffect(() => {
    setIsLoading(true);
    getArticles(params).then(({ articles }) => {
      setArticles((current) => {
        return [...current, ...articles];
      });
      if (articles.length > 0) {
        setIsLoading(false);
      }
      if (articles.length % params.limit !== 0) {
        setMore(false);
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

  const loadArticles = () => {
    setParams((current) => {
      return { ...current, p: current.p + 1 };
    });
  };

  console.log("params :>> ", params);
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
          {more ? (
            <Button
              variant="primary"
              className="d-block py-3 w-25 m-auto"
              onClick={loadArticles}
            >
              More articles
            </Button>
          ) : null}
        </>
      )}
    </main>
  );
};
