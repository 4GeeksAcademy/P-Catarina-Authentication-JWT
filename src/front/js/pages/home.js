import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context)

	console.log(store.message || "Not connected")

	return (
		<div className="container-fluid text-center">
			<h5 className="mt-5 text-light">{store.message || "Not connected"}</h5>
			<img className="m-5 border" src="https://i.pinimg.com/originals/c0/b1/12/c0b1123ec1f2aabc57d9a707913aede6.jpg" />
		</div>
	);
};