import React, {useContext, useState} from "react";
import {getUsers} from "../utils/api";
import {UserContext} from "../context/UserContext";
import Button from "react-bootstrap/Button";

export const SignIn = () => {
	const [currentVal, setCurrentVal] = useState("");
	const [error, setError] = useState("");
	const {username, setUsername} = useContext(UserContext);

	const handleChangeLogin = (e) => {
		setCurrentVal(e.target.value);
	};

	const handleSubmitLogin = (e) => {
		e.preventDefault();

		getUsers().then((users) => {
			const isUserRegistered = users.some(
				(user) => user.username === currentVal
			);
			if (isUserRegistered) {
				setUsername(currentVal);
				setError("");
				setCurrentVal("");
			} else {
				setError("Username not found, please try again!");
			}
		});
	};
	return (
		<main className="container text-center m-5">
			<h4>Login to access NC News</h4>
			{error && (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			)}
			<form onSubmit={handleSubmitLogin}>
				<label>
					<input
						type="text"
						onChange={handleChangeLogin}
						value={currentVal}
						placeholder="Username"
					/>
				</label>
				<Button type="submit">Login</Button>
			</form>
		</main>
	);
};
