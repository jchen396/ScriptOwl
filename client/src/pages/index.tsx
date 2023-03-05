import Layout from "@/components/Layout";
import { gql, useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import { FunctionComponent } from "react";
import client from "../../apollo-client";

interface Props {
	usersData: number[];
}

const Home: FunctionComponent<Props> = ({ usersData }) => {
	console.log(usersData);
	return (
		<>
			<Layout>
				<div className=""></div>
			</Layout>
		</>
	);
};

export async function getServerSideProps() {
	const { data } = await client.query({
		query: gql`
			query getUsers {
				users {
					id
					username
					password
					email
				}
			}
		`,
	});

	return {
		props: {
			usersData: data,
		},
	};
}

export default Home;
