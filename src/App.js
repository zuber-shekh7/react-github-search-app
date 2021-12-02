import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";

import { gitHubAPIClient } from "./apis/GitHubAPI";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setUsername(e.target.value);
    }
  };

  const fetchData = async (username) => {
    setData(null);
    setIsLoading(true);
    try {
      const response = await gitHubAPIClient.get(`/users/${username}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      return;
    }
    fetchData(username);
  };

  const renderData = () => {
    if (data && isLoading === false) {
      return (
        <h2>
          <Link to="/">{data.name}</Link>
        </h2>
      );
    } else {
      return <h2>No User Found</h2>;
    }
  };
  return (
    <Router>
      <div>
        <h1>GitHub Search App</h1>
        <input
          value={username}
          type="text"
          onChange={handleChange}
          placeholder="Enter Username"
        />
        <button onClick={handleSubmit}>Submit</button>
        {isLoading && <h2>Loading...</h2>}
        {renderData()}
      </div>
    </Router>
  );
};

export default App;
