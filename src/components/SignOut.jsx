import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const SignOut = () => {
  const { username, setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    setUsername("");
    navigate("/");
  };
  return (
    <Button variant="info" onClick={logout}>
      Logout &nbsp; <FontAwesomeIcon icon={faRightFromBracket} />
    </Button>
  );
};
