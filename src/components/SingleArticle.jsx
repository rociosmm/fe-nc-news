import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getArticleByID} from "../utils/api";
import {SideBar} from "./SideBar";

export const SingleArticle = () => {
	const {article_id} = useParams();
	const [singleArticle, setSingleArticle] = useState({});
	console.log("article_id :>> ", article_id);
	let dateArticle;
	useEffect(() => {
		getArticleByID(article_id).then((article) => {
			setSingleArticle(article);
		});
	}, [article_id]);

	if (singleArticle.created_at) {
		const date = new Date(singleArticle.created_at);
		dateArticle = date.toLocaleDateString();
	}
	console.log("singleArticle :>> ", singleArticle);

	return (
		<div id="single-article-page">
			<article id={singleArticle.article_id}>
				<h1>{singleArticle.title}</h1>
				<img
					id="featured-image"
					src={singleArticle.article_img_url}
					alt={singleArticle.title + " featured image"}
				/>

				<h5>
					<img
						src="/src/assets/images/tags-icon.png"
						width={"16px"}
						alt="tags icon"
					/>
					&nbsp; {singleArticle.topic}
				</h5>
				<p className="meta-info">
					{singleArticle.author} | {dateArticle}
				</p>
				<div id="body">{singleArticle.body}</div>
			</article>
			<aside>
				<SideBar />
			</aside>
		</div>
	);
};
