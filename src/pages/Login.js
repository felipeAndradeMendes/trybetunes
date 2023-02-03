import React from 'react';

class Login extends React.Component {
  render() {
    const {
      disable,
      handleChange,
      handleClick,
    } = this.props;

    return (
      <div data-testid="page-login">
        <form>
          Nome:
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ handleChange }
          />
          <button 
            type="button"
            data-testid="login-submit-button"
            disabled={ disable }
            onClick={ handleClick }         
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
