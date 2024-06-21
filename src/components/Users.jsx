import React, {useContext, useEffect, useState} from "react";
import {getUsers} from "../utils/api";
import {UsersCard} from "./designComponents/UsersCard";
import {UserContext} from "../context/UserContext";

export const Users = () => {
	const [users, setUsers] = useState([]);
	const {username} = useContext(UserContext);

	useEffect(() => {
		getUsers().then((users) => {
			setUsers(users);
		});
	}, []);

	return (
		<>
			<h1 className="mt-5">NC Users</h1>
			<section id="users">
				{users.map((user) => {
					return <UsersCard key={user.username} user={user} />;
				})}
			</section>
		</>
	);
};
