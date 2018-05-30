import "isomorphic-fetch";

// Actions
const FETCH_DATA_REQUEST = "FETCH_DATA_REQUEST";
const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
const POST_DATA_REQUEST = "FETCH_DATA_REQUEST";
const POST_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
const POST_DATA_FAILURE = "FETCH_DATA_FAILURE";

// initial store
const initial = {
  list: [],
  fetched: false
}

// Reducer
export default function reducer(state = initial, action) {
  switch (action.type) {
    case FETCH_DATA_SUCCESS: {
      return { ...state, list: action.payload, fetched: true };
    }
    case POST_DATA_SUCCESS: {
      return { ...state, list: action.payload, fetched: true };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
const requestData = () => ({ type: FETCH_DATA_REQUEST });
const receivedData = resto => ({ type: FETCH_DATA_SUCCESS, payload: resto });
const getDataError = () => ({ type: FETCH_DATA_FAILURE });

const postData = () => ({ type: POST_DATA_REQUEST });
const receivedPostData = resto => ({ type: POST_DATA_SUCCESS, payload: resto });
const postDataError = () => ({ type: POST_DATA_FAILURE });

export const fetchData = () => (dispatch, getState) => {
  dispatch(requestData());
  return fetch("http://localhost:1337/resto/")
    .then(response => response.json())
    .then(resto => dispatch(receivedData(resto)))
    .catch(err => dispatch(getDataError(err)));
};
export const updateData = (data) => (dispatch, getState) => {
  dispatch(postData());
  return fetch(`http://localhost:1337/resto/${id}`, {
        method: 'PUT',
        body: data
      })
    .then(response => response.json())
    .then(resto => dispatch(receivedPostData(resto)))
    .catch(err => dispatch(getDataError(err)));
};