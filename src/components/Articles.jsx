import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getArticles} from "../utils/api";
import {ArticleCard} from "./designComponents/ArticleCard";

export const Articles = () => {
	const {topic} = useParams();
	const [articlesByTopic, setArticlesByTopic] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [params, setParams] = useState({
		topic: topic,
		sort_by: "created_at",
		order: "desc",
	});
	console.log("topic :>> ", topic);

	useEffect(() => {
		getArticles({topic}).then(({articles}) => {
			setArticlesByTopic(articles);
		});
		setIsLoading(false);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getArticles(params).then(({articles}) => {
			setArticlesByTopic(articles);
			if (articles.length > 0) {
				setIsLoading(false);
			}
		});
	}, [params]);

	const handleSort = (e) => {
		const {name, value} = e.target;
		setParams((current) => {
			return {...current, [name]: value};
		});
	};

	const handleOrder = (e) => {
		const {name, value} = e.target;
		setParams((current) => {
			return {...current, [name]: value};
		});
	};

	console.log("articlesByTopic :>> ", articlesByTopic);

	return (
		<main className="mt-5">
			<h1>NC News - {topic.charAt(0).toUpperCase() + topic.slice(1)}</h1>
			{isLoading ? (
				<div className="spinner-border text-danger" role="status">
					<span className="sr-only"></span>
				</div>
			) : (
				<>
					<section id="filter" className="me-5">
						<label>
							Sort by:{" "}
							<select
								name="sort_by"
								id="sort_by"
								onChange={handleSort}
								defaultValue={params.sort_by}
							>
								<option value="created_at">Date</option>
								<option value="votes">Votes</option>
								<option value="comment_count">Number of Comments</option>
							</select>
						</label>
						<label className="ms-3">
							Order:
							<select
								name="order"
								id="order"
								onChange={handleOrder}
								defaultValue={params.order}
							>
								<option value="desc">Descendant</option>
								<option value="asc">Ascendent</option>
							</select>
						</label>
					</section>
					<section id="articles-list">
						{articlesByTopic.map((article) => {
							return <ArticleCard key={article.article_id} article={article} />;
						})}
					</section>
				</>
			)}
		</main>
	);
};
