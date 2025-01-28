import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Home from "./pages/Home";
import SearchSongs from "./pages/SearchSongs";
import SavedSongs from "./pages/SavedSongs";
import LyricsPage from "./pages/LyricsPage"; // Import the LyricsPage component

// Construct the GraphQL API endpoint
const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "/graphql"
      : "http://localhost:3001/graphql", // Use different endpoints for development and production
});

// Middleware to attach the JWT token for authorization
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token"); // Retrieve JWT token from localStorage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Add Authorization header if token exists
    },
  };
});

// Initialize Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combine authLink and httpLink
  cache: new InMemoryCache(), // Set up in-memory caching
});

// Define routes for the application
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main application component
    errorElement: (
      <h1
        className="display-2 text-center mt-5"
        style={{ color: "#ff4b2b" }}
      >
        Wrong page!
      </h1>
    ), // Error message for invalid routes
    children: [
      {
        index: true, // Default child route
        element: <Home />, // Home page
      },
      {
        path: "/search", // Search page route
        element: <SearchSongs />,
      },
      {
        path: "/saved", // Saved songs route
        element: <SavedSongs />,
      },
      {
        path: "/lyrics/:songId", // Lyrics page route with dynamic songId
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