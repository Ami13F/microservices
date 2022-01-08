import React, { useState } from "react";
import "./App.css";
import BooksTable from './components/BooksTable'
import SearchView from './components/SearchView'

function App() {
  const token = JSON.parse(localStorage.getItem("token"))

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");

  const [search, setSearch] = useState("");

  if (token == null || token === "") return <h3>Login first!</h3>;

  return (
    <div className="App-header" id="main">
      <SearchView setSearch={setSearch} setData={setData} setLoading={setLoading} />
      {search === "" ? <h3 id="searchH3">Search something!</h3> : <BooksTable data={data} loading={loading} />}
    </div>
  );
}

export default App;
