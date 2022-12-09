import React, { Component } from 'react';
import WalletForm from './WalletForm';

class Header extends Component {
  state = {
    valor: 0,
    // isDisabled: true,
  };

  // onInputChange = ({ target }) => {
  //   const { name, value } = target;
  //   this.setState({
  //     [name]: value,
  //   });
  //   // , () => {
  //   //   const one = 1;
  //   //   const { valor } = this.state;
  //   //   const valid = valor >= one;
  //   //   console.log(valid);
  //   //   this.setState({ isDisabled: !valid });
  //   // });
  // };

  render() {
    const { valor } = this.state;
    return (
      <>
        <form>
          <label
            htmlFor="valor"
            data-testid="total-field"
          >
            {`despesa total: ${valor}`}
            {/* <input
              type="text"
              data-testid="total-field"
              name="valor"
              value={ valor }
              onChange={ this.onInputChange }
            /> */}
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select data-testid="header-currency-field">
              <option>BRL</option>
            </select>
          </label>
        </form>
        <WalletForm />
      </>
    );
  }
}

export default Header;
