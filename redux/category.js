import "isomorphic-fetch";

// Actions
const FETCH_DATA_CAT_REQUEST = "FETCH_DATA_CAT_REQUEST";
const FETCH_DATA_CAT_SUCCESS = "FETCH_DATA_CAT_SUCCESS";
const FETCH_DATA_CAT_FAILURE = "FETCH_DATA_CAT_FAILURE";
const FETCH_DATA_CAT_BYID_REQUEST = "FETCH_DATA_CAT_BYID_REQUEST";
const FETCH_DATA_CAT_BYID_SUCCESS = "FETCH_DATA_CAT_BYID_SUCCESS";
const FETCH_DATA_CAT_BYID_FAILURE = "FETCH_DATA_CAT_BYID_FAILURE";

// initial store
const initial = {
  list: [],
  fetched: false
}

// Reducer
export default function reducer(state = initial, action) {
  switch (action.type) {
    case FETCH_DATA_CAT_SUCCESS: {
      return { ...state, list: action.payload, fetched: true };
    }
    case FETCH_DATA_CAT_BYID_SUCCESS: {
      return { ...state, restolist: action.payload, fetched: true };
    }
    default: {
      return state;
    }
  }
}

// Action Creators
const requestDataCat = () => ({ type: FETCH_DATA_CAT_REQUEST });
const receivedDataCat = category => ({ type: FETCH_DATA_CAT_SUCCESS, payload: category });
const getDataCatError = () => ({ type: FETCH_DATA_CAT_FAILURE });

// Action Creators
const requestDataCatId = () => ({ type: FETCH_DATA_CAT_BYID_REQUEST });
const receivedDataCatId = category => ({ type: FETCH_DATA_CAT_BYID_SUCCESS, payload: category });
const getDataCatErrorId = () => ({ type: FETCH_DATA_CAT_BYID_FAILURE });

export const fetchCategoryDataById = (id) => (dispatch, getState) => {
  dispatch(requestDataCatId());
  return fetch(`http://localhost:1337/category/getone?id=${id}`)
    .then(response => response.json())
    .then(category => dispatch(receivedDataCatId(category)))
    .catch(err => dispatch(getDataCatErrorId(err)));
};

export const fetchCategoryData = () => (dispatch, getState) => {
  dispatch(requestDataCat());
  return fetch("http://localhost:1337/category/")
    .then(response => response.json())
    .then(category => dispatch(receivedDataCat(category)))
    .catch(err => dispatch(getDataCatError(err)));
};