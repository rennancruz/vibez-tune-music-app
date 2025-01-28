import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context"; // Corrected import path
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import SearchSongs from "./pages/SearchSongs";
import SavedSongs from "./pages/SavedSongs";
import LyricsPage from "./pages/LyricsPage"; // Import the new LyricsPage

// Construct the GraphQL API endpoint
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3001/graphql", // Adjusted for development and production environments
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

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <h1
        className="display-2 text-center mt-5"
        style={{ color: "#ff4b2b" }}
      >
        Wrong page!
      </h1>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/search",
        element: <SearchSongs />,
      },
      {
        path: "/saved",
        element: <SavedSongs />,
      },
      {
        path: "/lyrics/:songId", // Added route for LyricsPage
        element: <LyricsPage />,
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);