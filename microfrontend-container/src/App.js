import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Redirect,Switch, Routes, Route } from "react-router-dom";

const Auth = React.lazy(() => import('auth/App'));
const Books = React.lazy(() => import('books/App'));

function App() {
  return (
    <div className="app">
      
    <React.Suspense fallback="Loading content...">
      <BrowserRouter >      
        <Routes >
          <Route path="/auth" element={<Auth />} />

          <Route path="/books" element={<Books />} />

        </Routes>

        </BrowserRouter>
    </React.Suspense>
  </div>
  );
}

export default App;

