import React, { useState } from "react";

let url = "https://api.github.com";
const GITHUB_API_TOKEN = process.env.REACT_APP_GITHUB_API_TOKEN;

const App = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    if (e.target.value !== "") {
      setUsername(e.target.value);
    }
  };

  const fetchData = async (username) => {
    const response = await fetch(`${url}/users/${username}`, {
      headers: {
        Authorization: `Token ${GITHUB_API_TOKEN}`,
      },
    });
    const json = await response.json();
    setData(json);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData(username);
  };

  const renderData = () => {
    if (data) {
      return <h2>{data.name}</h2>;
    } else {
      return <h2>No Data Found</h2>;
    }
  };
  return (
    <div>
      <h1>GitHub Search App</h1>
      <input
        value={username}
        type="search"
        onChange={handleChange}
        placeholder="Enter Username"
      />
      <button onClick={handleSubmit}>Submit</button>
      {data && renderData()}
    </div>
  );
};

export default App;
