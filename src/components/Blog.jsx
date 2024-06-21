import React, {useState, useEffect, useContext} from "react";
import {ArticleCard} from "./designComponents/ArticleCard";
import {getArticles} from "../utils/api";
import { UserContext } from "../context/UserContext";

export const Blog = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const {username} = useContext(UserContext)

	useEffect(() => {
		getArticles().then(({articles}) => {
			setArticles(articles);
		});
		setIsLoading(false);
	}, []);
	return (
		<main className="mt-5">
			<h1>NC News</h1>
			{isLoading ? (
				<p
					style={{
						background: "red",
						fontWeight: "bold",
						color: "white",
						textAlign: "center",
					}}
				>
					Loading...
				</p>
			) : (
				<section id="articles-list">
					{articles.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />;
					})}
				</section>
			)}
		</main>
	);
};
