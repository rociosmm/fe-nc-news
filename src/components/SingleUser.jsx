import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticles, getUser } from "../utils/api";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { UserContext } from "../context/UserContext";
import { ArticleCard } from "./designComponents/ArticleCard";
import { LastArticleCard } from "./designComponents/LastArticleCard";

export const SingleUser = () => {
  const usernamePage = useParams().username;
  console.log("usernamePage :>> ", usernamePage);
  const [userDetails, setUserDetails] = useState({});
  const { username } = useContext(UserContext);
  const [articlesUser, setArticlesUser] = useState([]);

  useEffect(() => {
    getUser(usernamePage).then((user) => {
      console.log("user :>> ", user);
      setUserDetails(user);
    });

    getArticles({ author: usernamePage }).then((data) => {
      console.log("data userPAge :>> ", data);
      setArticlesUser(data.articles);
    });
  }, []);


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
              <Button variant="outline-primary">Post new article</Button>{" "}
              <Button variant="outline-secondary">Edit Profile</Button>{" "}
            </Card.Body>
          ) : null}
        </Card>
      </section>
      <section id="articles-list">
        <h2>{userDetails.name}'s posts</h2>
        {articlesUser.map((article) => {
          return <LastArticleCard key={article.article_id} article={article} />;
          /* return <ArticleCard key={article.article_id} article={article} />; */
        })}
      </section>
    </div>
  );
};
