import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editId, removeId } from '../redux/actions';

class Table extends Component {
  deletClick = (id) => {
    const { dispatch } = this.props;
    dispatch(removeId(id));
  };

  editClick = (id) => {
    const { dispatch, expenses } = this.props;
    const resul = expenses.find((a) => a.id === id);
    dispatch(editId(resul.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
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
          </thead>
          <tbody>
            {
              expenses.map((a) => (
                <tr key={ a.id }>
                  <td>{a.description}</td>
                  <td>{a.tag}</td>
                  <td>{a.method}</td>
                  <td>{Number(a.value).toFixed(2)}</td>
                  <td>{a.exchangeRates[a.currency].name}</td>
                  <td>{Number(a.exchangeRates[a.currency].ask).toFixed(2)}</td>
                  <td>{Number(a.value * a.exchangeRates[a.currency].ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.deletClick(a.id) }
                    >
                      Excluir
                    </button>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.editClick(a.id) }
                    >
                      Editar despesa
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.array,
  editor: PropTypes.bool,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(Table);
