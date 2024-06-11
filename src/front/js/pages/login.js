import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const { store, actions } = useContext(Context)

	return (
		<div className="container mt-5 w-25">
			<div className="card border">
			<div className="card-body row p-5 g-2">
				<form>
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email"
							name="email"
							className="form-control border"
							value={store.inputs.email || ""} 
							onChange={event => actions.getInput(event)}
							required />
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password"
							name="password"
							className="form-control border"
							value={store.inputs.password || ""} 
							onChange={event => actions.getInput(event)}
							required />
					<Link to="/welcome">
						<button type="submit" className="btn btn-success col-12 border mt-4" onClick={actions.login}>
							Login
						</button>
					</Link>
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
