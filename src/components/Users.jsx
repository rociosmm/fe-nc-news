import React, {useEffect, useState} from "react";
import {getUsers} from "../utils/api";
import {UsersCard} from "./designComponents/UsersCard";

export const Users = () => {
	const [users, setUsers] = useState([]);

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
