import React, {useState, useEffect} from "react";
import {ArticleCard} from "./designComponents/ArticleCard";
import {getArticles} from "../utils/api";

export const Blog = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

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
