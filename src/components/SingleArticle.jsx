import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {editArticle, getArticleByID} from "../utils/api";
import {SideBar} from "./SideBar";
import {Comments} from "./Comments";
import {UserContext} from "../context/UserContext";

export const SingleArticle = () => {
	const {article_id} = useParams();
	const [singleArticle, setSingleArticle] = useState({});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const {username} = useContext(UserContext);
	let dateArticle;
	useEffect(() => {
		getArticleByID(article_id).then((article) => {
			setSingleArticle(article);
		});

		setLoading(false);
	}, [article_id]);

	if (singleArticle.created_at) {
		const date = new Date(singleArticle.created_at);
		dateArticle = date.toLocaleDateString();
	}

	const vote = (increment) => {
		setSingleArticle((currentArt) => {
			return {...currentArt, votes: currentArt.votes + increment};
		});

		editArticle(singleArticle.article_id, {
			inc_votes: increment,
		})
			.then((data) => {
				setSingleArticle(data.article);
			})
			.catch((err) => {
				setError("Try again, your vote couldn't be added");
				throw new Error(err.message);
			});
	};

	return (
		<div id="single-article-page">
			{loading ? (
				<div className="spinner-border text-danger text-xl-center" role="status">
					<span className="sr-only">Loading...</span>
				</div>
			) : (
				<article id={"article-" + singleArticle.article_id}>
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
					{!error ? (
						<p>Article votes: {singleArticle.votes}</p>
					) : (
						setTimeout(() => {
							singleArticle.votes - 1;
						}, 1000)
					)}
					<p>
						Give us your vote:
						<button className="btn-hidden-design" onClick={(e) => vote(1)}>
							<img
								src="/src/assets/images/like.png"
								width={"16px"}
								alt="Like comment"
								title="Like comment"
							/>
						</button>{" "}
						|
						<button className="btn-hidden-design" onClick={(e) => vote(-1)}>
							<img
								src="/src/assets/images/dislike.png"
								width={"18px"}
								alt="Dislike comment"
								title="Dislike comment"
							/>
						</button>
					</p>
					<div id="body">{singleArticle.body}</div>

					<Comments article_id={singleArticle.article_id} />
				</article>
			)}
			<aside>
				<SideBar />
			</aside>
		</div>
	);
};
