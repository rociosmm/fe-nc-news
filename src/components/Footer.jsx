import React from "react";
import {Link} from "react-router-dom";

export const Footer = ({topics}) => {
	return (
		<footer className="p-3 mt-4 mx-0 bg-body-tertiary">
			<div className="container row">
				<div className="logo col-10 col-md-3 offset-1 offset-md-0 text-center text-md-start">
					<span className="news">N</span>C<span className="news">News</span>
				</div>
				<div id="footer-nav" className="col-12 col-md-9 d-md-flex">
					<ul className="ms-md-auto ps-0 align-middle mb-0">
						<li className="d-none d-md-block">
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
