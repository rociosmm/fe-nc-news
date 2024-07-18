import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export const UsersCard = ({ user }) => {
  console.log("user :>> ", user);
  return (
    <Card className="user-card">
      <Link to={`/users/${user.username}`}>
        <Card.Img
          className="img-fluid"
          variant="top"
          src={user.avatar_url}
          alt={`${user.name}'s profile picture`}
          title={`${user.name}'s profile picture`}
        />
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>{user.username}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};
