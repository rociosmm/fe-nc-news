import React, { useContext, useDebugValue, useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { UserContext } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { capitalizeString } from "../utils/helpers";

export const SignIn = () => {
  const [currentVal, setCurrentVal] = useState("");
  const [error, setError] = useState("");
  const { username, setUsername } = useContext(UserContext);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsersList(users);
    });
  }, []);

  const handleChangeLogin = (e) => {
    setCurrentVal(e.target.value);
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    //getUsers().then((users) => {
    const isUserRegistered = usersList.some(
      (user) => user.username === currentVal
    );
    if (isUserRegistered) {
      setUsername(currentVal);
      setError("");
      setCurrentVal("");
    } else {
      setError("Username not found, please try again!");
    }
    //});
  };
  return (
    <main className="container text-center m-5">
      <h4 className="mb-4">Login to access NC News</h4>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Form onSubmit={handleSubmitLogin} className="w-50 m-auto">
        <Row className="mb-3">
          <Form.Label>
            Add your username or select one from the dropdown
          </Form.Label>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Control
              type="text"
              id="usernameToLogIn"
              aria-describedby="username to log in with"
              onChange={handleChangeLogin}
              value={currentVal}
              placeholder="Username"
            />
          </Form.Group>
          {/* <input
          type="text"
          onChange={handleChangeLogin}
          value={currentVal}
          placeholder="Username"
        /> */}
          <Form.Group as={Col} controlId="button-login">
            <Form.Select
              aria-label="Default select example"
              onChange={handleChangeLogin}
            >
              <option>Open this select menu</option>
              {usersList.map((user) => {
                return (
                  <option key={user.username} value={user.username}>
						{user.name} - {user.username}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Button variant="primary" className="px-5" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </main>
  );
};
