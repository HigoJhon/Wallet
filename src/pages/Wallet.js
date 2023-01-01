import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Table from '../components/Table';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <>
        <h1>WALLET</h1>
        <div data-testid="email-field">{`Email: ${email}`}</div>
        <Header />
        <br />
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);
