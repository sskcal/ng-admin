import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/users/list">
            <MainLayout>users</MainLayout>
          </Route>
          <Route path="/users/roles">
            <MainLayout>roles</MainLayout>
          </Route>
        </Switch>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
