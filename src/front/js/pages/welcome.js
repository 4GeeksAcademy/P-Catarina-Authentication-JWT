import React from "react";
import { Card } from "../component/card";

export const Welcome = () => {
	return (
		<Card text={typeof localStorage.getItem('user') !== "string"
					? "You are not logged in"
					: "Welcome " + localStorage.getItem('user')
		} />
	);
};