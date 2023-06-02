import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import RoutesList from "./RoutesList";
import Navigation from "./Navigation";
import 'bootstrap/dist/css/bootstrap.css';
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import userContext from "./userContext";


/** Compiles Jobly App
 *
 * state:
 * - token: token received from backend, initial state set to value of joblyToken in localStorage
 * - currUser: { username, firstName, lastName, email, isAdmin }
 * - isLoading: initial value true, changes to false after App user data is loaded
 *
 * App -> Navigation / RoutesList
*/

function App() {
  const [ token, setToken ] = useState(localStorage.getItem("joblyToken"));
  const [currUser, setCurrUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  console.log("currUser=", currUser)

  /** useEffect to check state of token.
   * If token, decode token as payload.
   * Make axios request with payload.username.
   * Set response as currUser.
   */
  useEffect(function checkToken() {
    async function decodeToken() {
      if (token) {
        const payload = jwt_decode(token);
        JoblyApi.token = token;

        const user = await JoblyApi.getUser(payload.username);
        setCurrUser(user);
        setIsLoading(false);
      } else {
        setCurrUser(null);
        setIsLoading(false);
      }
    }
   decodeToken();
  }, [token])

  /** Set joblyToken in localStorage to value of token */
  useEffect(function updateLocalStorage() {
    if (token) {
      localStorage.setItem('joblyToken', token);
    } else {
      localStorage.removeItem('joblyToken');
    }
  }, [token]);


  /** Make request to login, set response as token. */
  async function login(data) {
    //TODO: add error catching for all api requests to account for 504
    const resp = await JoblyApi.login(data);
    setToken(resp);
  };

  /** Make request to sign up, set response as token. */
  async function signup(data) {
    const resp = await JoblyApi.register(data);
    setToken(resp);
  };

  /** Make request to update user information, set response as currUser */
  async function update(data) {
    const resp = await JoblyApi.update(data);
    setCurrUser(resp);
  }

  /** Log out user, reset token. */
  function logout() {
     setToken("");
  };

  if (isLoading) return <i>Loading...</i>;

  return (
    <div className="App">
      <userContext.Provider value={{currUser}}>
        <BrowserRouter>
          <Navigation logout={logout}/>
          <RoutesList login={login} signup={signup} update={update}/>
        </BrowserRouter>
      </userContext.Provider>
    </div>
  );
}

export default App;
