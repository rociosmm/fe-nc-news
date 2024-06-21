import React, {useContext, useEffect, useState} from "react";
import {getCommentsForArticle, postComment} from "../utils/api";
import {useForm} from "../hooks/useForm";
import {CommentBox} from "./designComponents/CommentBox";
import {UserContext} from "../context/UserContext";

export const Comments = ({article_id}) => {
	const [commentsFetch, setCommentsFetch] = useState([]);
	const {username} = useContext(UserContext);
	const {form, handleChange, handleSubmit} = useForm({
		username: username,
	});
	const [postedComment, setPostedComment] = useState({});
	const [successMsg, setSuccessMsg] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (article_id) {
			getCommentsForArticle(article_id).then((comments) => {
				setCommentsFetch(comments);
				if (comments.length > 0) setIsLoading(false);
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
					<div className="alert alert-success" role="alert">
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
					<input type="submit" value={"submit"} className="custom-btn" />
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
