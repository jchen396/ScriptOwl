import React from "react";
import Link from "next/link";

interface Props {
	pageCount: number;
	currentPage: string;
}

const PaginationBar: React.FC<Props> = ({ pageCount, currentPage }) => {
	//generate the number of pages from 1 to N
	const pages = Array.from(
		Array(Math.ceil(pageCount)),
		(_, index) => index + 1
	);
	return (
		<div className="flex flex-row items-center justify-center space-x-4">
			{pages.map((page, key) => {
				return (
					<Link
						className={`p-2 w-14 h-14 border border-white text-lg rounded flex justify-center items-center ${
							page === parseInt(currentPage)
								? "bg-white text-black hover:cursor-default"
								: "text-white hover:bg-white hover:text-black"
						}`}
						key={key}
						href={{
							pathname: "/",
							query: { page },
						}}
					>
						{page}
					</Link>
				);
			})}
		</div>
	);
};

export default PaginationBar;
