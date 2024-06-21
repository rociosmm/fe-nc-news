import React, {useEffect, useState} from "react";
import {getCommentsForArticle, postComment} from "../utils/api";
import {useForm} from "../hooks/useForm";
import {CommentBox} from "./designComponents/CommentBox";

export const Comments = ({article_id}) => {
	const [commentsFetch, setCommentsFetch] = useState([]);
	const [userLogged, setUserLogged] = useState("grumpy19");
	const {form, handleChange, handleSubmit} = useForm({
		username: userLogged,
	});
	const [postedComment, setPostedComment] = useState({});
	const [successMsg, setSuccessMsg] = useState("");
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
		postComment(article_id, form).then(({comment}) => {
			setPostedComment(comment);
			setSuccessMsg("You posted a comment!");
			setTimeout(() => setSuccessMsg(""), 2000);
			const myForm = document.querySelector("#post-comment-form");
			myForm.reset();
		});
	};
	return (
		<div id="comments">
			<p className="fs-4 fw-bold">Comments</p>
			<section id="post-comment">
				{successMsg !== "" ? (
					<div class="alert alert-success" role="alert">
						{successMsg}
					</div>
				) : null}
				<form id="post-comment-form" onSubmit={handleSubmitComment}>
					<label>
						Write your comment:
						<textarea
							name="body"
							id="comment-body"
							rows="3"
							cols="100"
							placeholder="Your comment..."
							onChange={handleChange}
						/>
					</label>
					<input type="submit" value={"submit"} className="btn" />
				</form>
			</section>
			{commentsFetch.length > 0 ? (
				<section id="comments-list">
					{Object.keys(postedComment).length > 0 ? (
						<CommentBox
							newClass={"new-comment-posted"}
							comment={postedComment}
						/>
					) : null}

					{commentsFetch.map((comment) => {
						let commentDate;
						if (comment.created_at) {
							const date = new Date(comment.created_at);
							commentDate = date.toLocaleDateString();
						}
						return (
							<CommentBox
								comment={comment}
								key={comment.comment_id}
								commentDate={commentDate}
							/>
						);
					})}
				</section>
			) : null}
		</div>
	);
};
