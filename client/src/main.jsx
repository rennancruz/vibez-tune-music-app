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
import SearchSongs from "./pages/SearchSongs";
import SavedSongs from "./pages/SavedSongs";
import Search from "./components/Search.jsx";
import LoginForm from "./components/LoginForm.jsx";
import Login from "./Pages/Login.jsx";

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
    errorElement: <h1 className="display-2 text-center mt-5">Wrong page!</h1>, // Styled error message
    children: [
      {
        index: true,
        element: <Search />, // Default route for searching songs
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/saved",
        element: <SavedSongs />, // Route for viewing saved songs
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
