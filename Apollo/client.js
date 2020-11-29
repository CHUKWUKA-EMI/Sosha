import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
	uri: process.env.BACKEND_URL,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const authData = JSON.parse(localStorage.getItem("authData"));
	const token = authData ? authData.token : "";
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `${token}` : "",
		},
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});
