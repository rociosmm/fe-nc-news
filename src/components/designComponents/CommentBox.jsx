import React from "react";

export const CommentBox = ({comment, commentDate, newClass = ""}) => {
	return (
		<article className={"comment " + newClass}>
			<p className="fw-bold mb-1">{comment.author}:</p>
			<p>{comment.body}</p>
			<p>
				{commentDate} | Votes: {comment.votes} — Is it useful for you?{" "}
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
};
