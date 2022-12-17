import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </table>
        <table>
          {
            expenses.map((a) => (
              <tbody key={ a }>
                <tr>
                  <td>{a.description}</td>
                  <td>{a.tag}</td>
                  <td>{a.method}</td>
                  <td>{Number(a.value).toFixed(2)}</td>
                  <td>{a.exchangeRates[a.currency].name}</td>
                  <td>{Number(a.exchangeRates[a.currency].ask).toFixed(2)}</td>
                  <td>{Number(a.value * a.exchangeRates[a.currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                </tr>
              </tbody>

            ))
          }
        </table>
      </>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
