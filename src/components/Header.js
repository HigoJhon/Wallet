import React, { Component } from 'react';
import WalletForm from './WalletForm';

class Header extends Component {
  state = {
    valor: 0,
    moeda: 'BRL',
  };

  render() {
    const { valor, moeda } = this.state;
    return (
      <>
        <form>
          <label
            htmlFor="valor"
            data-testid="total-field"
          >
            {`despesa total: ${valor}`}
          </label>
          <div>
            <label
              htmlFor="moeda"
              data-testid="header-currency-field"
            >
              { `Moeda: ${moeda}` }
            </label>

          </div>
        </form>
        <WalletForm />
      </>
    );
  }
}

export default Header;
