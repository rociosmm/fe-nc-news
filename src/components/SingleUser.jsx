import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteArticle, getArticles, getUser } from "../utils/api";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";
import { ArticleCard } from "./designComponents/ArticleCard";
import { LastArticleCard } from "./designComponents/LastArticleCard";
import { PostEditArticle } from "./PostEditArticle";
import { SignOut } from "./SignOut";

export const SingleUser = () => {
  const usernamePage = useParams().username;
  const [userDetails, setUserDetails] = useState({});
  const { username } = useContext(UserContext);
  const [articlesUser, setArticlesUser] = useState([]);
  const [postArticle, setPostArticle] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
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
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  }, [postArticle, successMsg]);

  const deletePost = (article_id, title) => {
    console.log("article_id delete :>> ", article_id);
    deleteArticle(article_id).then((msg) => {
      console.log("msg :>> ", msg);
      setSuccessMsg(`Article "${title}" deleted`);
    });
  };

  

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
            <>
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
              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  <SignOut />
                </ListGroup.Item>
              </ListGroup>
            </>
          ) : null}
        </Card>
      </section>
      {!postArticle ? (
        <section id="articles-list">
          <h2>{userDetails.name}'s posts</h2>
          {successMsg ? (
            <div className="alert alert-success" role="alert">
              {successMsg}
            </div>
          ) : null}
          {articlesUser.map((article) => {
            return (
              <div className="user-article-in-feed" key={article.article_id}>
                <LastArticleCard article={article} />
                <Button
                  variant="outline-danger"
                  onClick={() => deletePost(article.article_id, article.title)}
                >
                  X Delete
                </Button>
              </div>
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
