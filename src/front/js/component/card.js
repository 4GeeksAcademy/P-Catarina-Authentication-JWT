import React from "react";

export const Card = (props) => {
	return (
		<div className="container mt-5 w-50">
            <div className="card border">
			<div className="card-body p-5">
            <h3 className="text-center">{props.text}</h3>
			</div>
			</div>
		</div>
	);
};
