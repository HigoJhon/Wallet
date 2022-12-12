// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const login = (email) => ({
  type: LOGIN,
  payload: email,
});

export function requestStarted() {
  return { type: REQUEST_STARTED };
}

export function requestSuccessful(currencies) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

export function requestFailed(error) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

export function fetchMoeda() {
  return (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => {
        delete data.USDT;
        const arrayzin = Object.keys(data);
        console.log(data);
        dispatch(requestSuccessful(arrayzin));
      });
    // .catch((error) => dispatch(requestFailed(error)));
  };
}
