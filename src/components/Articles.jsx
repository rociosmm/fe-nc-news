import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getArticles} from "../utils/api";
import {ArticleCard} from "./designComponents/ArticleCard";

export const Articles = () => {

	const {topic} = useParams();
	const [articlesByTopic, setArticlesByTopic] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	console.log("topic :>> ", topic);

	useEffect(() => {
		getArticles({topic}).then(({articles}) => {
			setArticlesByTopic(articles);
		});
		setIsLoading(false);
	}, []);

	console.log("articlesByTopic :>> ", articlesByTopic);


	return (
		<main className="mt-5">
			<h1>NC News - {topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
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
					{articlesByTopic.map((article) => {
						return <ArticleCard key={article.article_id} article={article} />;
					})}
				</section>
			)}
		</main>
	);
};
