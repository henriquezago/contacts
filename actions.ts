import {
  FETCH_CONTACTS_STARTED,
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILURE,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_STARTED,
  UPDATE_CONTACT_FAILURE,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_STARTED,
  DELETE_CONTACT_FAILURE,
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

export const updateContact = (contact) => {
  return (dispatch) => {
    dispatch(updateContactStarted());

    axios
      .put(`/api/contacts?id=${contact.id}`, contact)
      .then((res) => {
        dispatch(updateContactSuccess(res.data));
      })
      .catch((err) => {
        dispatch(updateContactFailure(err.message));
      });
  };
};

const updateContactSuccess = (contact) => ({
  type: UPDATE_CONTACT_SUCCESS,
  payload: contact,
});

const updateContactStarted = () => ({
  type: UPDATE_CONTACT_STARTED,
});

const updateContactFailure = (error) => ({
  type: UPDATE_CONTACT_FAILURE,
  payload: error,
});

export const deleteContact = (id) => {
  return (dispatch) => {
    dispatch(deleteContactStarted());

    axios
      .delete(`/api/contacts?id=${id}`)
      .then(() => {
        dispatch(deleteContactSuccess(id));
      })
      .catch((err) => {
        dispatch(deleteContactFailure(err.message));
      });
  };
};

const deleteContactSuccess = (contactId) => ({
  type: DELETE_CONTACT_SUCCESS,
  payload: {
    id: contactId,
  },
});

const deleteContactStarted = () => ({
  type: DELETE_CONTACT_STARTED,
});

const deleteContactFailure = (error) => ({
  type: DELETE_CONTACT_FAILURE,
  payload: error,
});
