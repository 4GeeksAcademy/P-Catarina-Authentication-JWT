import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5 w-25">
			<div className="card border">
			<form className="card-body row p-5 g-2">
                <label htmlFor="username" className="form-label">Retro Name</label>
				<input type="text"
						name="username"
						className="form-control border"
						value={store.inputs.username || ""}
						onChange={event => actions.getInput(event)}
						required />
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email"
						name="email"
						className="form-control border"
						value={store.inputs.email || ""}
						onChange={event => actions.getInput(event)}
						required />
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						className="form-control border"
						name="password"
						value={store.inputs.password || ""}
						onChange={event => actions.getInput(event)} />
				<div type="button" className="btn btn-success col-12 border mt-4" onClick={actions.signup}>
					Join the Club
				</div>
				<Link to="/welcome">
					<div className="btn btn-success col-12 border mt-4">
						Next
					</div>
				</Link>
			</form>
			</div>
		</div>
	);
};
