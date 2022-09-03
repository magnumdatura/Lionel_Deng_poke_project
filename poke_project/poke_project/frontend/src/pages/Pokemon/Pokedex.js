import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import {
  displayAllPokemon,
  displayMyPokemon,
  displayUnownedPokemon,
  displayReleasePokemon,
} from "../../actions/auth";

const Pokedex = ({
  allPokemon,
  unownedPokemon,
  myPokemon,
  releasePokemon,
  displayMyPokemon,
  displayAllPokemon,
  displayUnownedPokemon,
  displayReleasePokemon,
}) => {
  const [myDisplayRender, setMyDisplayRender] = useState(false);
  const [renderUnownedPokemon, setRenderUnownedPokemon] = useState(false);

  useEffect(() => {
    displayMyPokemon();
  }, [releasePokemon]);


  function handleAllPokemon(event) {
    event.preventDefault();

    console.log("---------- ALL POKEMON ---------------");
    displayAllPokemon();

    setMyDisplayRender(false);
    setRenderUnownedPokemon(false);
  }

  function handleUnownedPokemon(event) {
    event.preventDefault();

    console.log("------------- UNOWNED POKEMON -------------");

    displayUnownedPokemon();
    setRenderUnownedPokemon(true);
    setMyDisplayRender(false)
  }

  function handleMyPokemon(event) {
    event.preventDefault();

    console.log("------------- MY POKEMON -------------");
    
    displayMyPokemon();
    setRenderUnownedPokemon(false);
    setMyDisplayRender(true);
  }

  function handlePokemonRelease(event) {
    event.preventDefault();
    console.log('-------------- RELEASE POKEMON ---------------')
    const releasePokemonID = event.target.getAttribute("storeid");
    displayReleasePokemon(releasePokemonID);
  }

  return (
    <div>
      <div className="m-3 mx-auto d-flex justify-content-center">
        <div className="mx-2">
          <form onSubmit={handleAllPokemon}>
            <button type="submit">All Pokemon</button>
          </form>
        </div>
        <div className="mx-2">
          <form onSubmit={handleUnownedPokemon}>
            <button type="submit">Uncollected Pokemon</button>
          </form>
        </div>
        <div className="mx-2">
          <form onSubmit={handleMyPokemon}>
            <button type="submit">My Pokemon Collection</button>
          </form>
        </div>
      </div>
      <div className="my-5">
        <table class="table table-dark">
          <thead>
            <tr>
              <th scope="col">Pokemon ID</th>
              <th scope="col">Name</th>
              <th scope="col">Health Points</th>
              <th scope="col">Attack</th>
              <th scope="col">Defense</th>
              <th scope="col">Level</th>
              <th scope="col">Type</th>
              <th scope="col">Release!</th>
            </tr>
          </thead>
          <tbody>
            {myDisplayRender
              ? myPokemon?.map((pokemon, index) => {
                  return (
                    <tr>
                      <th scope="row">{pokemon?.id}</th>
                      <td>{pokemon?.name}</td>
                      <td>{pokemon?.hp}</td>
                      <td>{pokemon?.attack}</td>
                      <td>{pokemon?.defense}</td>
                      <td>{pokemon?.level}</td>
                      <td>{pokemon?.type}</td>
                      <td>
                        <form
                          onSubmit={handlePokemonRelease}
                          name="release"
                          storeid={pokemon?.id}
                        >
                          <button className="btn btn-primary" type="submit">
                            Release
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })
              : renderUnownedPokemon ? unownedPokemon?.map((pokemon, index) => {
                return (
                  <tr>
                    <th scope="row">{pokemon?.id}</th>
                    <td>{pokemon?.name}</td>
                    <td>{pokemon?.hp}</td>
                    <td>{pokemon?.attack}</td>
                    <td>{pokemon?.defense}</td>
                    <td>{pokemon?.level}</td>
                    <td>{pokemon?.type}</td>
                    <td></td>
                  </tr>
                );
              }) :
              allPokemon?.map((pokemon, index) => {
                  return (
                    <tr>
                      <th scope="row">{pokemon?.id}</th>
                      <td>{pokemon?.name}</td>
                      <td>{pokemon?.hp}</td>
                      <td>{pokemon?.attack}</td>
                      <td>{pokemon?.defense}</td>
                      <td>{pokemon?.level}</td>
                      <td>{pokemon?.type}</td>
                      <td></td>
                    </tr>)})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allPokemon: state.auth.allPokemon,
  unownedPokemon: state.auth.unownedPokemon,
  myPokemon: state.auth.myPokemon,
  releasePokemon: state.auth.releasePokemon,
});

export default connect(mapStateToProps, {
  displayAllPokemon,
  displayUnownedPokemon,
  displayMyPokemon,
  displayReleasePokemon,
})(Pokedex);
