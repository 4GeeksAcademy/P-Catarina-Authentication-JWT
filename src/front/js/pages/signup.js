import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container mt-5 w-25">
			<div className="card border">
			<form onSubmit={actions.signup} className="card-body row p-5 g-2">
                <label htmlFor="username" className="form-label">Retro Name</label>
				<input type="text"
						id="username"
						className="form-control border"
						value={store.inputs.username || ""}
						onChange={event => actions.getInput(event)}
						required />
				<label htmlFor="email" className="form-label">Email</label>
				<input type="email"
						id="email"
						className="form-control border"
						value={store.inputs.email || ""}
						onChange={event => actions.getInput(event)}
						required />
				<label htmlFor="password" className="form-label">Password</label>
				<input type="password"
						className="form-control border"
						id="password"
						value={store.inputs.password || ""}
						onChange={event => actions.getInput(event)} />
				<button type="submit" className="btn btn-success border mt-4">
					Join the Club
				</button>
			</form>
			</div>
		</div>
	);
};
