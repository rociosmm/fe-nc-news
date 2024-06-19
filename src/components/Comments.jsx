import React, {useEffect, useState} from "react";
import {getCommentsForArticle} from "../utils/api";

export const Comments = ({article_id}) => {
	const [commentsFetch, setCommentsFetch] = useState([]);
	useEffect(() => {
		if (article_id) {
			getCommentsForArticle(article_id).then((comments) => {
				setCommentsFetch(comments);
			});
		}
	}, [article_id]);
	return (
		<div id="comments">
			<p className="fs-4 fw-bold">Comments</p>
			<section id="post-comment">
				<form action="">
					<label>
						Write your comment:
						<textarea id="comment-body" rows="5" cols="100"></textarea>
					</label>
					<input type="hidden" name="article_id" id={article_id} />
					<input type="hidden" name="username" id={article_id} />
					<button className="btn">Submit comment</button>
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
