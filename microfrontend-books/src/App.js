import React, { useState, useEffect } from "react";
import "./App.css";
import { BookDetails } from "./bookDetails";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");


  function handleRowClick(url) {
    console.log(url)
    //  history.push(url);
    // const win = window.open(url, "_blank");
    // win.focus();
  }
  const onSubmit = (e) => {
    e.preventDefault();
    var searchText = e.target.elements.searchText.value;
    setSearch(searchText);
    if (searchText === "") return;

    var currentPage = 1;
    setLoading("loading")
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
        setLoading("")
        //   var tempTable = `<tr>
        //   <th> Author </th>
        //   <th> Publish Date </th>
        //   <th> Title </th>
        //   <th> Number Of Pages</th>
        //   <th> Icon </th>
        // </tr>`;
        var myData = []
        Object.values(r).forEach((element) => {
          console.log(element)

          var cover = ""
          var number_of_pages = "Not specified"
          if (element.hasOwnProperty('cover'))
            cover = element.cover.medium
          if (element.hasOwnProperty('number_of_pages'))
            number_of_pages = element.number_of_pages
          element.cover = cover
          element.number_of_pages = number_of_pages

          myData.push(element)
        });
        console.log(myData)
        setData(myData)
      });
  };
  class Loading extends React.Component {
    render() {
      return (
        <div id="loading"><div className="loader">
          <div className="outer"></div>
          <div className="middle"></div>
          <div className="inner"></div>
        </div></div>
      );
    }
  }
  class BooksTable extends React.Component {
    render() {
      return (
        <>
          <div id="table">
            <h2>Your books:</h2>
            <table>
            {
                loading !== "" ?
               
             <></> :  (<thead>
             <tr>
               <th> Author </th>
               <th> Publish Date </th>
               <th> Title </th>
               <th> Number Of Pages</th>
               <th> Icon </th>
             </tr>
           </thead>) 
              }
              <tbody>{
                loading !== "" ?
                  <Loading />
                  :
                  data.map((element) => (
                    <tr onClick={handleRowClick(element.url)}>
                      <td>{element.authors[0].name}</td>
                      <td>{element.publish_date}</td>
                      <td>{element.title}</td>
                      <td>{element.number_of_pages}</td>
                      <td><img src={element.cover} alt="No cover" /></td>
                    </tr>
                  ))
              }
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
          <div id="searchDiv">
            <form className="search-form" onSubmit={onSubmit}>
              <input className="search-input" name="searchText" placeholder="Search books" type="search"></input>
              <button type="submit" className="search-button">
                <svg className="submit-button">
                  <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#searchSymbol"></use>
                </svg>
              </button>
            </form>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" display="none">
              <symbol id="searchSymbol" viewBox="0 0 32 32">
                <path d="M 19.5 3 C 14.26514 3 10 7.2651394 10 12.5 C 10 14.749977 10.810825 16.807458 12.125 18.4375 L 3.28125 27.28125 L 4.71875 28.71875 L 13.5625 19.875 C 15.192542 21.189175 17.250023 22 19.5 22 C 24.73486 22 29 17.73486 29 12.5 C 29 7.2651394 24.73486 3 19.5 3 z M 19.5 5 C 23.65398 5 27 8.3460198 27 12.5 C 27 16.65398 23.65398 20 19.5 20 C 15.34602 20 12 16.65398 12 12.5 C 12 8.3460198 15.34602 5 19.5 5 z" />
              </symbol>
            </svg>
          </div>
        </>
      );
    }
  }

  const [search, setSearch] = useState("");

  return (
    <div className="App-header" id="main">
      <SearchView />
      {search === "" ? <h3 id="searchH3">Search something!</h3> : <BooksTable />}
    </div>
  );
}

export default App;
