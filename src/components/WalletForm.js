import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchMoeda } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMoeda());
  }

  // handleChange = ({ name, value }) => {
  //   this.setState({ [name]: value });
  // };

  render() {
    const { currencies } = this.props;
    console.log(currencies);
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoria = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              data-testid="value-input"
              type="number"
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              data-testid="currency-input"
              // onChange={ this.handleChange }
            >
              {
                currencies.map((a) => <option key={ a }>{ a }</option>)
              }
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select data-testid="tag-input">
              {
                categoria.map((a) => <option key={ a }>{ a }</option>)
              }
            </select>
          </label>
          <label htmlFor="pagamento">
            Pagamento:
            <select data-testid="method-input">
              {
                pagamento.map((a) => <option key={ a }>{ a }</option>)
              }
            </select>
          </label>
          <label htmlFor="descricao">
            Descrição da despesa:
            <input
              type="text"
              data-testid="description-input"
            />
          </label>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
