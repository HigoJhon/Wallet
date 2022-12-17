import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from './WalletForm';

class Header extends Component {
  state = {
    moeda: 'BRL',
  };

  sun = () => {
    const { expenses } = this.props;
    // console.log(expenses);
    return expenses.reduce((acc, curr) => acc + curr.value
    * curr.exchangeRates[curr.currency].ask, 0);
  };

  render() {
    const { moeda } = this.state;
    return (
      <>
        <form>
          <label
            htmlFor="sum"
            data-testid="total-field"
          >
            {(this.sun().toFixed(2))}
          </label>
          <br />
          <label
            htmlFor="moeda"
            data-testid="header-currency-field"
          >
            { `Moeda: ${moeda}` }
          </label>

        </form>
        <WalletForm />
      </>
    );
  }
}

Header.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
