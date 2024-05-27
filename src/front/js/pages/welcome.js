import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card } from "../component/card";

export const Welcome = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.welcomeUser()
	},[])

	const username = localStorage.getItem('user')

	return (
		<Card text={"Welcome back " + username} />
	);
};
