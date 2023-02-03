import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    btnEntrar: true,
    loginName: '',
    loading: false,
  };

  handleChange = ({ target: { value } }) => {
    const { loginName } = this.state;
    this.setState({
      loginName: value,
      btnEntrar: (loginName.length <= 1),
    });
  };

  createUserFunc = async () => {
    const { loginName } = this.state;
    const { history } = this.props;
    // console.log('HISTORY', history)
    // console.log('INICIOU A FUNÇÃO')

    this.setState({
      loading: true,
    });
    // console.log('CHAMOU O SETsTATE')

    await createUser({ name: loginName });
    // console.log('ACABOU A FUNÇÃO ASYNC')

    this.setState({
      loading: false,
    }, () => { history.push('/search'); });
  };

  render() {
    const {
      btnEntrar,
      loading,
    } = this.state;

    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          Nome:
          <input
            data-testid="login-name-input"
            type="text"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ btnEntrar }
            onClick={ this.createUserFunc }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
