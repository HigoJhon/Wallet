import { REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED } from '../actions';

const initialState = {
  currencies: [],
  errorMessage: '',
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_STARTED:
    return {
      ...state,
      errorMessage: '',
      currencies: '',
    };

  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: action.payload,
      errorMessage: '',
    };

  case REQUEST_FAILED:
    return {
      ...state,
      errorMessage: action.payload,
      currencies: '',
    };
  default:
    return state;
  }
};

export default wallet;
