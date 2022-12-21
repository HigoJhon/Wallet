import { REQUEST_SUCCESSFUL, ADD_EXPENSES, REMOVE, EDIT, SAVEEDIT } from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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

  case REMOVE:
    return {
      ...state,
      expenses: state.expenses.filter((a) => Number(a.id !== action.payload)),
    };

  case EDIT:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case SAVEEDIT:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };

  default:
    return state;
  }
};

export default wallet;
