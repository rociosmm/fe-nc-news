import React from "react";
import {Link} from "react-router-dom";

export const Error404 = () => {
	return (
		<section className="py-md-5 min-vh-100 d-flex justify-content-center align-items-center">
			<div className="container">
				<div className="text-center">
					<p className="h1">404</p>
					<p className="h2 mb-2">Oops! You're lost.</p>
					<p className="mb-5">The page you are looking for was not found.</p>
					<Link
						className="btn btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0"
						to={"/blog"}
					>
						Back to blog
					</Link>
				</div>
			</div>
		</section>
	);
};
