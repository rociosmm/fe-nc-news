import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";

export const ArticleCard = ({article}) => {
	return (
		<Card style={{width: "18rem"}}>
			<Card.Img
				variant="top"
				src={article.article_img_url}
				alt={`Feature image for ${article.title}`}
				title={`Feature image for ${article.title}`}
			/>

			<Card.Body>
				<Card.Title>
					<h5>{article.title}</h5>
				</Card.Title>
				<Link to={`/blog/${article.article_id}`} title={`Read ${article.title}`}>
					Read article
				</Link>
			</Card.Body>
		</Card>
	);
};
