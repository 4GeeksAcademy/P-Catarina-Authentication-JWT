import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context)

	return (
		<div className="container mt-5 w-25">
			<div className="card border">
			<div className="card-body row p-5 g-2">
				<form onSubmit={actions.login}>
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email"
							id="email"
							className="form-control border"
							value={store.inputs.email || ""} 
							onChange={event => actions.getInput(event)}
							required />
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password"
							id="password"
							className="form-control border"
							value={store.inputs.password || ""} 
							onChange={event => actions.getInput(event)}
							required />
					<button type="submit" className="btn btn-success col-12 border mt-4">
						Login
					</button>
				</form>
				<Link to="/signup">
					<button className="btn btn-dark col-12 border mt-4" onClick={actions.resetInput}>
						Not part of the club yet?
					</button>
				</Link>
				</div>
			</div>
		</div>
	);
};
