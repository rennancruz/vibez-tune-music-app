import "./App.css";
import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar";

// Construct the GraphQL API endpoint
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3001/graphql", // Adjusted for environments
});

// Middleware to attach JWT token for authorization
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app-container">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
