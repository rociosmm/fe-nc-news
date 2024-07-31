import React, { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { ArticleCard } from "./designComponents/ArticleCard";
import { Link } from "react-router-dom";

export const Home = () => {
  const [articles, setArticles] = useState([]);
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles({ limit: articlesPerPage, p: page }).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <>
          <h1 className="d-block">Last news</h1>
          <section id="articles-list">
            {articles.map((article) => {
              return <ArticleCard key={article.article_id} article={article} />;
            })}
          </section>
          <Link to="/blog" className="btn btn-primary d-block py-3 w-25 m-auto">
            View all articles
          </Link>
        </>
      )}
    </div>
  );
};
