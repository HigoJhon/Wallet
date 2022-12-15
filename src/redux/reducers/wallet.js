import { REQUEST_SUCCESSFUL, ADD_EXPENSES } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      currencies: action.payload,
    };

  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };

  default:
    return state;
  }
};

export default wallet;
