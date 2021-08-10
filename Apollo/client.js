import { ApolloClient, InMemoryCache, HttpLink, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  if (typeof window !== "undefined") {
    const authData = JSON.parse(localStorage.getItem("authData"));
    const token = authData ? authData.token : "";
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  }
});

const httpLink = new HttpLink({
  uri: process.env.BACKEND_URL,
});

const wsUrl = process.env.SUBSCRIPTIONS_ENDPOINT;
const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://localhost:4000/subscriptions",
      options: {
        reconnect: true,
      },
    })
  : null;

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

export const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
