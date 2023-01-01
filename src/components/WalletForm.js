import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEdit, addExpenses, fetchMoeda } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
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

  handleChange = ({ target: { name, value } }) => {
    // const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { id, value, description, currency, method, tag } = this.state;

    const api = await fetch('https://economia.awesomeapi.com.br/json/all');
    const response = await api.json();
    const { dispatch } = this.props;

    this.setState((eve) => ({
      ...eve,
      id: eve.id + 1,
    }));

    const newStart = {
      id,
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

  handleSubmitEdit = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const resul = expenses.map((a) => {
      if (a.id === idToEdit) {
        return {
          ...a,
          value,
          description,
          currency,
          method,
          tag,
        };
      }
      return a;
    });
    dispatch(addEdit(resul));
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
    const { currencies, editor } = this.props;
    // console.log(currencies);
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
              {currencies.map((a, index) => <option key={ index }>{ a }</option>)}
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
              {categoria.map((a, index) => <option key={ index }>{ a }</option>)}
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
              {pagamento.map((a, index) => <option key={ index }>{ a }</option>)}
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
          {
            editor !== false
              ? (
                <button
                  id="buttonEdit"
                  type="button"
                  onClick={ this.handleSubmitEdit }
                >
                  Editar despesa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={ this.handleSubmit }
                >
                  Adicionar despesa
                </button>

              )
          }
        </form>

      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.array,
  dispatch: PropTypes.func,
  editor: PropTypes.bool,
  idToEdit: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(WalletForm);
