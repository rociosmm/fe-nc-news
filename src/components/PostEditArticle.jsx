import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const PostEditArticle = () => {
	const {username} = useContext(UserContext)
	return <div>PostEditArticle</div>;
};
