import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  LOGOUT,
  ALL_POKEMON_FAIL,
  ALL_POKEMON_SUCCESS,
  UNOWNED_POKEMON_FAIL,
  UNOWNED_POKEMON_SUCCESS,
  MY_POKEMON_SUCCESS,
  MY_POKEMON_FAIL,
  ADD_POKEMON_SUCCESS,
  ADD_POKEMON_FAIL,
  RANDOM_POKEMON_SUCCESS,
  RANDOM_POKEMON_FAIL,
  POKEMON_RELEASE_SUCCESS,
  POKEMON_RELEASE_FAIL
} from "./types";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`, // sends authorization access token
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`, // this retrieves the user profile information from djoser, which as defined in accounts(app)/serializers.py should return id, email, name
        config
      );
      console.log(JSON.stringify(res.data));
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

export const checkAuthenticated = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const displayAllPokemon = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/pokemon/allpokemon/`,
      config
    );

    dispatch({
      type: ALL_POKEMON_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ALL_POKEMON_FAIL,
    });
  }
};

export const displayUnownedPokemon = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/pokemon/unownedpokemon/`,
        config
      );

      dispatch({
        type: UNOWNED_POKEMON_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: UNOWNED_POKEMON_FAIL,
      });
    }
  } else {
    dispatch({
      type: UNOWNED_POKEMON_FAIL,
    });
  }
};

export const displayMyPokemon = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/pokemon/mypokemon/`,
        config
      );

      dispatch({
        type: MY_POKEMON_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: MY_POKEMON_FAIL,
      });
    }
  } else {
    dispatch({
      type: MY_POKEMON_FAIL,
    });
  }
};

export const displayRandomPokemon = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/pokemon/randompokemon/`,
        config
      );
      dispatch({
        type: RANDOM_POKEMON_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: RANDOM_POKEMON_FAIL,
      });
    }
  } else {
    dispatch({
      type: RANDOM_POKEMON_FAIL,
    });
  }
};

export const displayAddPokemon = (pokemonID, pokemonLevel) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    const body = JSON.stringify({
      pokemonID: pokemonID,
      pokemonLevel: pokemonLevel,
    });
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/pokemon/addpokemon/`,
        body,
        config
      );

      dispatch({
        type: ADD_POKEMON_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_POKEMON_FAIL,
      });
    }
  } else {
    dispatch({
      type: ADD_POKEMON_FAIL,
    });
  }
};

export const displayReleasePokemon = (releasePokemonID) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({
      releasePokemonID: releasePokemonID
    });
    
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/pokemon/releasepokemon/`,
        body,
        config
      );

      dispatch({
        type: POKEMON_RELEASE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: POKEMON_RELEASE_FAIL,
      });
    }
  } else {
    dispatch({
      type: POKEMON_RELEASE_FAIL,
    });
  }
};
