import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loading from "../Loading";

function handleRowClick(url) {
    console.log(url)
    
    // TODO: check why always called
    // navigate("/books/seebooks")
  }

class BooksTable extends React.Component {
    render() {
      return this.props.loading !== "" ? (<Loading />) : (
        <div id="table">
          <h2>Your books:</h2>
          <table>
            <thead>
              <tr>
                <th> Author </th>
                <th> Publish Date </th>
                <th> Title </th>
                <th> Number Of Pages</th>
                <th> Icon </th>
              </tr>
            </thead>
            <tbody>{
              this.props.data.map((element, index) => (
                <tr key={index} onClick={() => handleRowClick(element.url)}>
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
      );
    }
  }

  export default BooksTable;