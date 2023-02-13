import {
  FETCH_CONTACTS_STARTED,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
} from "./types";

import axios from "axios";

export const getContacts = () => {
  return (dispatch) => {
    dispatch(getContactsStarted());

    axios
      .get("/api/contacts")
      .then((res) => {
        dispatch(getContactsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getContactsFailure(err.message));
      });
  };
};

const getContactsSuccess = (contacts) => ({
  type: FETCH_CONTACTS_SUCCESS,
  payload: contacts,
});

const getContactsStarted = () => ({
  type: FETCH_CONTACTS_STARTED,
});

const getContactsFailure = (error) => ({
  type: FETCH_CONTACTS_FAILURE,
  payload: error,
});
