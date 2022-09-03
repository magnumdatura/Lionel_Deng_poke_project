import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { displayAddPokemon, displayRandomPokemon } from "../../actions/auth";

const CatchPoke = ({
  addPokemon,
  randomPokemon,
  displayRandomPokemon,
  displayAddPokemon,
}) => {
  const [renderRandomPokemon, setRenderRandomPokemon] = useState({});
  const [userGuessInput, setUserGuessInput] = useState(0);
  const [userLost, setUserLost] = useState(false);
  const [userWon, setUserWon] = useState(false);

  const randomPokemonID = renderRandomPokemon?.id;
  const randomPokemonLevel = renderRandomPokemon?.level;
  let userLives = 3;

  useEffect(() => {
    displayRandomPokemon();
  }, [renderRandomPokemon]);

  function handleRandomPokemon(event) {
    event.preventDefault();
    
    setRenderRandomPokemon(randomPokemon);
  }

  function handleGuessChange(event) {
    event.preventDefault();

    setUserGuessInput(event.target.value);
  }

  function handleGuessSubmit(event) {
    event.preventDefault();

    const randomNumber = Math.floor(Math.random() * 25 + 1);

    if (userGuessInput == randomNumber) {
      displayAddPokemon(randomPokemonID, randomPokemonLevel);
      setUserWon(true);
      window.alert("YOU WIN! Pokemon added");
    } else {
      userLives -= 1;
    }
    if (userLives === 0) {
      setUserLost(true);
      window.alert("YOU LOSE!");
    }
  }

  if (userLost) {
    return <Navigate to="/" />;
  }

  if (userWon) {
    return <Navigate to="/pokedex" />;
  }

  return (
    <div>
      <div className="m-4 text-center">
        <form onSubmit={handleRandomPokemon}>
          <button type="submit">Roll a random pokemon!</button>
        </form>
      </div>
      <div>
        <table className="table table-dark">
          <thead>
            <tr>
              <th scope="col">Pokemon ID</th>
              <th scope="col">Name</th>
              <th scope="col">Health Points</th>
              <th scope="col">Attack</th>
              <th scope="col">Defense</th>
              <th scope="col">Level</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{renderRandomPokemon?.id}</th>
              <td>{renderRandomPokemon?.name}</td>
              <td>{renderRandomPokemon?.hp}</td>
              <td>{renderRandomPokemon?.attack}</td>
              <td>{renderRandomPokemon?.defense}</td>
              <td>{renderRandomPokemon?.level}</td>
              <td>{renderRandomPokemon?.type}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="m-4">
        <h4>
          Guess a number between 1 and 25! You have 3 tries. If you get it
          right, the pokemon is yours!
        </h4>
      </div>
      <div className="m-4">
        <form onSubmit={handleGuessSubmit} className="w-full max-w-sm">
          <div className="my-3">
            <input
              className="form-control"
              id="guess"
              type="number"
              placeholder="guess a number"
              name="guess"
              value={userGuessInput}
              onChange={handleGuessChange}
              minLength="8"
              required
            />
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-2/3">
              <button className="btn btn-primary" type="submit">
                Submit!
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addPokemon: state.auth.addPokemon,
  randomPokemon: state.auth.randomPokemon,
});

export default connect(mapStateToProps, {
  displayAddPokemon,
  displayRandomPokemon,
})(CatchPoke);
