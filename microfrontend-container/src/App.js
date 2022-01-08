import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Redirect, Navigate, Routes, Route } from "react-router-dom";

const Auth = React.lazy(() => import('auth/App'));
const Books = React.lazy(() => import('books/App'));
const BookDetails = React.lazy(() => import('books/BookDetails'));

function App() {
  const token = localStorage.getItem("token")

  const isLogged = token !== "" || token != null

  return (
    <div className="app">

      <React.Suspense fallback="Loading content...">
        <BrowserRouter >
          <Routes >
            <Route path="/" element=
              {isLogged ?
                <Navigate replace to="/books" /> : <Navigate replace to="/auth" />}>
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/seebooks" element={<BookDetails />} />
          </Routes>

        </BrowserRouter>
      </React.Suspense>
    </div>
  );
}

export default App;

