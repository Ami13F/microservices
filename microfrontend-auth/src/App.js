import React, { useState, useEffect } from "react";
import "./App.css";
import { useLocalStorage } from "./tokenLocalStorage";

function App() {
  const [token, setToken] = useLocalStorage('token', '');

  const loginSubmit = (e) => {
    e.preventDefault();
    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;
    fetch(`http://localhost:3000/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((r) => {
        console.log(r);
        if (r.statusCode === 401) {
          throw new Error(r.status);
        }
        console.log("login ", r.accessToken);
        setIsValid("");
        setIsLogged(true);
        setToken(r.accessToken)
      })
      .catch(() => {
        console.log("login error");
        setIsValid("Login failed");
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isLogged === true) {
      console.log("is logged");
      loginSubmit(e);
    } else {
      console.log("is create");
    }
  };

  class LoginForm extends React.Component {
    render() {
      return (
        <>
          <h2> Login into your app</h2>
          <form id="loginForm" onSubmit={onSubmit}>
            <label>
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
            <label>
              <b>Password</b>
            </label>
            <input
              minLength="8"
              type="password"
              placeholder="Enter password"
              name="password"
              required
            />
            <button type="submit" onClick={() => setIsLogged(true)}>
              Login
            </button>
          </form>
          <button
            type="button"
            style={{ backgroundColor: "orange" }}
            onClick={() => setIsLogged(false)}
          >
            Create Account
          </button>
          {isValid === "" ? (
            <div></div>
          ) : (
            <div style={{ backgroundColor: "#ff0033" }} className="alert">
              <strong>Error!</strong> {isValid}
              <span
                className="closebtn"
                onClick={() => {
                  setIsValid("");
                }}
              >
                &times;
              </span>
            </div>
          )}
        </>
      );
    }
  }

  class CreateAccountForm extends React.Component {
    render() {
      return (
        <>
          <h2>Create new account</h2>
          <form
            type="submit"
            id="createAccountForm"
            onSubmit={(e) => createAccountSubmit(e)}
          >
            <label>
              <b>Email</b>
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              required
            />
            <label>
              <b>Password</b>
            </label>
            <input
              minLength="8"
              type="password"
              placeholder="Enter password"
              name="password"
              required
            />
            <div>
              <button type="submit" style={{ backgroundColor: "orange" }}>
                Create Account
              </button>
              <button type="submit" onClick={() => setIsLogged(true)}>
                Back to Login
              </button>
            </div>
          </form>
          {isValid === "" ? (
            <div></div>
          ) : (
            <div style={{ backgroundColor: "#ff0033" }} className="alert">
              <strong>Error: {isValid}</strong>
              <span
                className="closebtn"
                onClick={() => {
                  setIsValid("");
                }}
              >
                &times;
              </span>
            </div>
          )}
        </>
      );
    }
  }

  const createAccountSubmit = (e) => {
    console.log("createAccount", e);
    var email = e.target.elements.email.value;
    var password = e.target.elements.password.value;
    e.preventDefault();
    fetch(`http://localhost:3010/auth/signup`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((r) => {
        if (r.statusCode === 400) {
          throw new Error(r.status);
        }
        setIsValid("");
        setIsLogged(true);
      })
      .catch(() => {
        setIsValid("Account already exists!");
      });
  };
  const [isLogged, setIsLogged] = useState(true);
  const [isValid, setIsValid] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <div id="auth-form">
          {isLogged === true ? <LoginForm /> : <CreateAccountForm />}
        </div>
      </header>
    </div>
  );
}

export default App;
