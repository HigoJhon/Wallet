import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import WalletForm from '../components/WalletForm';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';

const expenses = [
  {
    id: 0,
    value: '10',
    description: 'test',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Lazer',
    exChangeRates: { ...mockData },
  },
];

const currencies = [
  'USD',
  'CAD',
  'GBP',
  'ARS',
  'BTC',
  'LTC',
  'EUR',
  'JPY',
  'CHF',
  'AUD',
  'CNY',
  'ILS',
  'ETH',
  'XRP',
  'DOGE',
];

const INITIAL_STATE = {
  user: {
    email: 'test@test.com',
  },
  wallet: {
    currencies,
    expenses,
    editor: false,
    idToEdit: 0,
  },
};

const emailInput = 'email-input';
const passwordInput = 'password-input';
const valueInput = 'value-input';
const descriptionInput = 'description-input';

describe('Testando a pagina de Login', () => {
  test('Test rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(passwordInput);
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(history.location.pathname).toBe('/');
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  test('Entrando na rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(passwordInput);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'test@test.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
  });
  test('Falhando os test', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailInput);
    const senha = screen.getByTestId(passwordInput);
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'test@testcom');
    userEvent.type(senha, '123456');
    expect(btn).toBeDisabled();
  });
});

describe('Testando a pagina de Despesas', () => {
  test('testando input', () => {
    renderWithRedux(<Wallet />);

    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
  test('testando adcionar dispesas', () => {
    renderWithRouterAndRedux(<WalletForm />, { initialState: INITIAL_STATE });

    const value = screen.getByTestId(valueInput);
    expect(value).toBeInTheDocument();

    const inputCurrency = screen.getByTestId('currency-input');
    expect(inputCurrency).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const description = screen.getByTestId(descriptionInput);
    expect(description).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(button).toBeInTheDocument();

    userEvent.type(value, '10');
    userEvent.type(description, 'test');
    userEvent.selectOptions(inputCurrency, 'CAD');
    expect(screen.getByText('CAD').selected).toBeTruthy();
    userEvent.selectOptions(tag, 'Trabalho');
    expect(screen.getByText('Trabalho').selected).toBeTruthy();
    userEvent.selectOptions(method, 'Cartão de crédito');
    expect(screen.getByText('Trabalho').selected).toBeTruthy();
    userEvent.click(button);
  });
  test('testando edit dispesas', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId(valueInput);
    const description = screen.getByTestId(descriptionInput);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(value, '20');
    userEvent.type(description, 'test1');
    userEvent.click(button);

    expect(await screen.findByRole('cell', { name: 'test1' })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' })).toBeInTheDocument();
  });
  test('editar despesas', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const valueInp = screen.getByTestId(valueInput);
    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(valueInp, '10');
    userEvent.click(button);

    const saveValue = await screen.findByRole('cell', { name: /10\.00/i });
    expect(saveValue).toBeInTheDocument();
    const btnExcl = screen.getByRole('button', { name: /excluir/i });
    expect(btnExcl).toBeInTheDocument();
    const btnEdit = screen.getByRole('button', { name: /editar/i });
    expect(btnEdit).toBeInTheDocument();
    userEvent.click(btnEdit);

    userEvent.type(valueInp, '10');
    userEvent.click(button);

    const newValue = await screen.findByRole('cell', { name: /10\.00/i });
    expect(newValue).toBeInTheDocument();
    userEvent.click(btnExcl);
    expect(newValue).not.toBeInTheDocument();
  });
});
