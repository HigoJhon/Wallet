import React from 'react';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const six = 6;
      const { email, password } = this.state;
      const validation = (
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
      );
      const valiEmail = email.match(validation);
      const valiPass = password.length < six;
      const valid = !valiEmail || valiPass;
      console.log(valid);
      this.setState({ isDisabled: valid });
    });
  };

  handleSubmit = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <input
          data-testid="email-input"
          type="email"
          // value={ email }
          name="email"
          placeholder="Digite o seu email"
          onChange={ this.handleChange }
        />
        <br />
        <input
          data-testid="password-input"
          placeholder="senha"
          type="password"
          name="password"
          // value={ password }
          onChange={ this.handleChange }
        />
        <br />
        <button
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
