import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getArticles, getUser } from "../utils/api";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";
import { ArticleCard } from "./designComponents/ArticleCard";
import { LastArticleCard } from "./designComponents/LastArticleCard";
import { PostEditArticle } from "./PostEditArticle";

export const SingleUser = () => {
  const usernamePage = useParams().username;
  const [userDetails, setUserDetails] = useState({});
  const { username } = useContext(UserContext);
  const [articlesUser, setArticlesUser] = useState([]);
  const [postArticle, setPostArticle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(usernamePage).then((user) => {
      setUserDetails(user);
    });

    getArticles({ author: usernamePage }).then((data) => {
      setArticlesUser(data.articles);
    });
  }, []);

  useEffect(() => {
    getArticles({ author: usernamePage }).then((data) => {
      setArticlesUser(data.articles);
    });
  }, [postArticle]);


  return (
    <div id="user-page">
      <section id="user-info">
        <Card style={{ width: "20rem" }}>
          <div className="profile-image-container">
            <Card.Img
              variant="top"
              src={userDetails.avatar_url}
              style={{ height: "200px", width: "auto" }}
              className="img-fluid"
            />
          </div>
          <Card.Body>
            <Card.Title>{userDetails.name}</Card.Title>
            <Card.Text>{userDetails.username}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <span>Number of articles:</span> {articlesUser.length}
            </ListGroup.Item>
          </ListGroup>
          {usernamePage === username ? (
            <Card.Body>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setPostArticle(true);
                }}
              >
                Post new article
              </Button>
              <Link
                to="/blog/new-article"
                className="btn btn-outline-secondary"
              >
                Edit Profile
              </Link>
            </Card.Body>
          ) : null}
        </Card>
      </section>
      {!postArticle ? (
        <section id="articles-list">
          <h2>{userDetails.name}'s posts</h2>
          {articlesUser.map((article) => {
            return (
              <LastArticleCard key={article.article_id} article={article} />
            );
            /* return <ArticleCard key={article.article_id} article={article} />; */
          })}
        </section>
      ) : (
        <PostEditArticle
          postArticle={postArticle}
          setPostArticle={setPostArticle}
          author={username}
        />
      )}
    </div>
  );
};
