// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE = 'REMOVE';
export const EDIT = 'EDIT';
export const SAVEEDIT = 'SAVEEDIT';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

export function addExpenses(expenses) {
  return {
    type: ADD_EXPENSES,
    payload: expenses,
  };
}

export function removeId(id) {
  return {
    type: REMOVE,
    payload: id,
  };
}

export function editId(id) {
  return {
    type: EDIT,
    payload: id,
  };
}

export function addEdit(id) {
  return {
    type: SAVEEDIT,
    payload: id,
  };
}

export function fetchMoeda() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        const arrayzin = Object.keys(data);
        // console.log(data);
        dispatch(requestSuccessful(arrayzin));
      });
    // .catch((error) => dispatch(requestFailed(error)));
  };
}
