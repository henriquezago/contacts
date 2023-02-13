import { combineReducers } from "redux";

import * as types from "./types";
import { Contact } from "./pages/api/contacts";

const initialContactState = {
  isLoading: false,
  contacts: [] as Contact[],
};

const contactReducer = (state = initialContactState, { type, payload }) => {
  switch (type) {
    case types.FETCH_CONTACTS_STARTED:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_CONTACTS_SUCCESS:
      return {
        isLoading: false,
        contacts: payload,
      };

    case types.FETCH_CONTACTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

const reducers = {
  contact: contactReducer,
};

export default combineReducers(reducers);
