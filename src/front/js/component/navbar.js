import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar bg-warning btm-border">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Retro Aint Dead-o Club</span>
				</Link>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-success border">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
