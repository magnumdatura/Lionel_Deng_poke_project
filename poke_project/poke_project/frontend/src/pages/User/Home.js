import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
    <div className="jumbotron mt-5">
      <h1 className="display-4">Welcome to your Pokedex</h1>
      <p className="lead">
        This is the landing page for your collection of pokemon!
      </p>
      <hr className="my-4" />
      <p>
        Click the login button to see your pokemon and access other cool features!
      </p>
      
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Log In
        </Link>
      
    </div>
    </div>
  );
};

export default Home;
