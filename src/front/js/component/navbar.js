import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		
	}, [])

	return (
		<nav className="navbar bg-warning btm-border">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Retro Aint Dead-o Club</span>
				</Link>
				<div className="ml-auto">
					{typeof localStorage.getItem('user') !== "string"
					? <Link to="/login">
						<button className="btn btn-success border">Login</button>
					</Link>
					: <Link to="/">
					<button className="btn btn-success border" onClick={actions.logout}>Logout</button>
					</Link>
					}
					
				</div>
			</div>
		</nav>
	);
};