import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testando a pagina de Login', () => {
  test('Test rota "/"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });

    expect(history.location.pathname).toBe('/');
    expect(email).toBeInTheDocument();
    expect(senha).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
  test('Entrando na rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const btn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(email, 'test@test.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
  });
});
