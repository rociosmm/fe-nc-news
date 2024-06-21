import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {UserContext} from "../context/UserContext";

export const Header = ({topics}) => {
	const {username} = useContext(UserContext);
	return (
		<>
			<Navbar expand="md" className="bg-body-tertiary" sticky="top">
				<Container>
					<Navbar.Brand href="/" className="ms-5 logo">
						<span className="news">N</span>C<span className="news">News</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto me-5">
							<Nav.Link href="/home">Home</Nav.Link>
							<Nav.Link href="/blog">Articles</Nav.Link>

							<NavDropdown title="Topics" id="basic-nav-dropdown">
								{topics.map((topic) => {
									return (
										<NavDropdown.Item
											href={`/blog/topics/${topic.slug}`}
											key={topic.slug}
										>
											{topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}
										</NavDropdown.Item>
									);
								})}
							</NavDropdown>
							<Nav.Link href="/blog/new-article">Post Article</Nav.Link>
							<Nav.Link href="/users">Users</Nav.Link>
						</Nav>
					</Navbar.Collapse>
					<p className="user-logged">
						Hello <span>{username}</span>
					</p>
				</Container>
			</Navbar>
		</>
	);
};
