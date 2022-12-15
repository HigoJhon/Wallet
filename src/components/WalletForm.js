import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addExpenses, fetchMoeda } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMoeda());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { value, description, currency, method, tag } = this.state;

    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await api.json();
    const { dispatch, expenses } = this.props;

    const newStart = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: response,
    };

    dispatch(addExpenses(newStart));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Lazer',
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    console.log(currencies);
    const pagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const categoria = ['Lazer', 'Alimentação', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <div>
        <form>
          <label htmlFor="valor">
            Valor:
            <input
              data-testid="value-input"
              type="number"
              value={ value }
              name="value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="moeda">
            Moeda:
            <select
              value={ currency }
              name="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
            >
              {currencies.map((a) => <option key={ a }>{ a }</option>)}
            </select>
          </label>
          <label htmlFor="categoria">
            Categoria:
            <select
              value={ tag }
              name="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              {categoria.map((a) => <option key={ a }>{ a }</option>)}
            </select>
          </label>
          <label htmlFor="pagamento">
            Pagamento:
            <select
              value={ method }
              name="method"
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              {pagamento.map((a) => <option key={ a }>{ a }</option>)}
            </select>
          </label>
          <label htmlFor="descricao">
            Descrição da despesa:
            <input
              value={ description }
              name="description"
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.handleSubmit }
          >
            Adicionar despesa
          </button>
        </form>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
