import React, { useState, useEffect } from "react";
import "./App.css";
import parse from 'html-react-parser'

function App() {
  const [table, setTable] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    var searchText = e.target.elements.searchText.value;
    setSearch(searchText);
    if (searchText === "") return;

    var currentPage = 1;
    var url = new URL(
      `http://localhost:3020/books/search/${searchText}/${currentPage}`
    );

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        var tempTable = "";
        Object.values(r).forEach((element) => {
          console.log(element)
          var cover = ""
          var number_of_pages = "Not specified"
          if(element.hasOwnProperty('cover'))
            cover = element.cover.medium
          if(element.hasOwnProperty('number_of_pages'))
            number_of_pages = element.number_of_pages         
          tempTable += `
          <tr>
            <td >${element.authors[0].name}</td>
            <td>${element.publish_date}</td>
            <td>${element.title}</td>
            <td>${number_of_pages}</td>
            <td data-icon="myicon"><img src="${cover}" alt="No cover"></td>
         </tr>
         </a>
          `;
        });
        setTable(tempTable)
      });
  };

  class BooksTable extends React.Component {
    render() {
      return (
        <>
          <div id="table">
            <h2>Your books:</h2>
            <table>
              <tbody>
                <tr>
                  <th> Author </th>
                  <th> Publish Date </th>
                  <th> Title </th>
                  <th> Number Of Pages</th>
                  <th> Icon </th>
                </tr>
                {parse (table)}
              </tbody>
            </table>
          </div>
        </>
      );
    }
  }

  class SearchView extends React.Component {
    // localStorage.getItem("token")
    render() {
      return (
        <>
          <div id="search">
            <h2>Search your book here!</h2>
            <form onSubmit={onSubmit}>
              <input name="searchText" type="text"></input>
              <button>Search</button>
            </form>
          </div>
        </>
      );
    }
  }

  const [search, setSearch] = useState("");

  return (
    <div className="App-header" id="main">
      <SearchView />
      {search === "" ? <h3 id="search">Search something!</h3> : <BooksTable />}
    </div>
  );
}

export default App;
