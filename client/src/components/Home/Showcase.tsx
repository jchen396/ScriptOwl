import React from "react";

interface Props {
	service: string;
}

const Showcase: React.FC<Props> = ({ service }) => {
	return (
		<div>
			{service ? (
				<p className="basis-1/2 text-gray-200 text-lg">{service}</p>
			) : (
				<p>
					Click on one of the service above to view more information.
				</p>
			)}
		</div>
	);
};

export default Showcase;
