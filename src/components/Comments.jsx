import React, {useEffect, useState} from "react";
import {getCommentsForArticle, postComment} from "../utils/api";
import {useForm} from "../hooks/useForm";

export const Comments = ({article_id}) => {
	const [commentsFetch, setCommentsFetch] = useState([]);
	const [userLogged, setUserLogged] = useState("rocio_admin");
	const {form, handleChange, handleSubmit} = useForm({
		author: userLogged,
	});
	// const [form, setForm] = useState({});

	// const [currentCommentForm, setCurrentCommentForm] = useState({
	// 	article_id: article_id,
	// 	author: userLogged,
	// });
	useEffect(() => {
		if (article_id) {
			getCommentsForArticle(article_id).then((comments) => {
				setCommentsFetch(comments);
			});
		}
	}, [article_id]);

	const handleSubmitComment = (e) => {
		e.preventDefault();
		handleSubmit(e);
		console.log("form bf send :>> ", form);
		postComment(article_id, form).then((data) => {
			console.log("data postComment :>> ", data);
		});
	};
	return (
		<div id="comments">
			<p className="fs-4 fw-bold">Comments</p>
			<section id="post-comment">
				<pre>{JSON.stringify(form)}</pre>
				<form onSubmit={handleSubmitComment}>
					<label>
						Write your comment:
						<textarea
							name="body"
							id="comment-body"
							rows="5"
							cols="100"
							placeholder="Your comment..."
							onChange={handleChange}
						/>
						{/* <input
							type="hidden"
							name="article_id"
							value={article_id}
						/>
						<input
							type="hidden"
							name="author"
							value={userLogged}
						/> */}
					</label>
					<input type="submit" value={"submit"} className="btn" />
				</form>
			</section>
			{commentsFetch.length > 0 ? (
				<section id="comments-list">
					{commentsFetch.map((comment) => {
						let commentDate;
						if (comment.created_at) {
							const date = new Date(comment.created_at);
							commentDate = date.toLocaleDateString();
						}
						return (
							<article className="comment" key={comment.comment_id}>
								<p className="fw-bold mb-1">{comment.author}:</p>
								<p>{comment.body}</p>
								<p>
									{commentDate} | Votes: {comment.votes} — Is it util for you?{" "}
									<button className="btn-hidden-design">
										<img
											src="/src/assets/images/like.png"
											width={"16px"}
											alt="Like comment"
											title="Like comment"
										/>
									</button>{" "}
									|
									<button className="btn-hidden-design">
										<img
											src="/src/assets/images/dislike.png"
											width={"18px"}
											alt="Dislike comment"
											title="Dislike comment"
										/>
									</button>
								</p>
							</article>
						);
					})}
				</section>
			) : null}
		</div>
	);
};
