import React from "react";
import { Link } from "react-router-dom";

export const Footer = ({topics}) => {
	return (
		<footer className="p-3 mt-4 mx-0 bg-body-tertiary">
			<div className="container">
				<div className="logo">
					<span className="news">N</span>C<span className="news">News</span>
				</div>
				<div id="footer-nav">
					<ul>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/blog">Articles</Link>
						</li>
						{topics.map((topic) => {
							return (
								<li key={topic.slug}>
									<Link to={`/blog/topics/${topic.slug}`}>
										{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
									</Link>
								</li>
							);
						})}
						<li>
							<Link to="/users">Users</Link>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
};
