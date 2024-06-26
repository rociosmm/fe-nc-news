import React, {useState, useEffect, useContext} from "react";
import {ArticleCard} from "./designComponents/ArticleCard";
import {getArticles} from "../utils/api";
import {UserContext} from "../context/UserContext";

export const Blog = () => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const {username} = useContext(UserContext);
	const [params, setParams] = useState({
		sort_by: "created_at",
		order: "desc",
	});

	useEffect(() => {
		getArticles(params).then(({articles}) => {
			setArticles(articles);
		});
		setIsLoading(false);
	}, []);

	useEffect(() => {
		setIsLoading(true);
		getArticles(params).then(({articles}) => {
			setArticles(articles);
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
	return (
		<main className="mt-5">
			<h1>NC News</h1>

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
						{articles.map((article) => {
							return <ArticleCard key={article.article_id} article={article} />;
						})}
					</section>
				</>
			)}
		</main>
	);
};
