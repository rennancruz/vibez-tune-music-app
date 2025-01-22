import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Playlist from "./components/Playlist";
import Search from "./components/Search";
import Lyrics from "./components/Lyrics";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/lyrics" element={<Lyrics />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
