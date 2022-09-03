import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
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
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: null,
  allPokemon: null,
  unownedPokemon: null,
  myPokemon: null,
  addPokemon: null,
  randomPokemon: null,
  releasePokemon: null,
};


// reducer function takes in actions from actions/auth.js and then sets it into initialState
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case LOAD_USER_SUCCESS:
      console.log(payload)
      return {
        ...state,
        user: payload,
      };
    case AUTHENTICATED_FAIL:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
      };
    case LOGIN_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return {
            ...state,
            access: null,
            refresh: null,
            isAuthenticated: false,
            user: null
        }
    case ALL_POKEMON_SUCCESS:
      return {
        ...state,
        allPokemon: payload
      }
    case ALL_POKEMON_FAIL:
      return {
        ...state,
        allPokemon: null
      }
    case UNOWNED_POKEMON_SUCCESS: 
      return {
        ...state,
        unownedPokemon: payload
      }
    case UNOWNED_POKEMON_FAIL:
      return {
        ...state,
        unownedPokemon: null
      }
    case MY_POKEMON_SUCCESS:
      return {
        ...state,
        myPokemon: payload
      }
    case MY_POKEMON_FAIL:
      return {
        ...state,
        myPokemon: null
      }
    case RANDOM_POKEMON_SUCCESS:
      return {
        ...state,
        randomPokemon: payload
      }
    case RANDOM_POKEMON_FAIL:
      return {
        ...state,
        randomPokemon: null
      }
    case ADD_POKEMON_SUCCESS:
      return {
        ...state,
        addPokemon: payload
      }
    case ADD_POKEMON_FAIL:
      return {
        ...state,
        addPokemon: null
      }
    case POKEMON_RELEASE_SUCCESS:
      return {
        ...state,
        releasePokemon: payload
      }
    case POKEMON_RELEASE_FAIL:
      return {
        ...state,
        releasePokemon: null
      }
    default:
      return state;
  }
}
