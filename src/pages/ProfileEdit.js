import React from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    btnSalvar: false,
    loading: false,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  validateInputs = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    // let regex = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i')
    // const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, 'gm');
    // const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const emailRegex = /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/;

    const validName = name.length > 0;
    const validEmail = emailRegex.test(email);
    const validDescription = description.length > 0;
    const validImage = image.length > 0;

    return !(validName && validEmail && validDescription && validImage);
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        btnSalvar: this.validateInputs(),
      });
    });
  };

  handleClick = async () => {
    const {
      name,
      email,
      image,
      description,
    } = this.state;

    const {
      history,
    } = this.props;

    const userInfoObj = {
      name,
      email,
      image,
      description,
    };
    this.setState({
      loading: true,
    }, async () => {
      await updateUser(userInfoObj);
      history.push('/profile');
      // this.setState({
      //   loading: false,
      // });
      // return <Redirect to="/profile/" />;
    });
  };

  getUserInfo = () => {
    this.setState({
      loading: true,
    }, async () => {
      const userInfos = await getUser();
      // console.log('USER INFOS', userInfos)
      this.setState({
        loading: false,
        name: userInfos.name,
        email: userInfos.email,
        image: userInfos.image,
        description: userInfos.description,
      });
    });
  };

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
      btnSalvar,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="profileEditContainer" data-testid="page-profile-edit">
        PROFILE EDIT
        <br />

        <form className="formProfileEditContainer">
          Nome:
          <input
            type="text"
            name="name"
            data-testid="edit-input-name"
            value={ name }
            onChange={ this.handleChange }
          />

          Email:
          <input
            type="email"
            name="email"
            data-testid="edit-input-email"
            value={ email }
            onChange={ this.handleChange }
          />

          Descrição:
          <input
            type="text"
            name="description"
            data-testid="edit-input-description"
            value={ description }
            onChange={ this.handleChange }
          />

          Foto:
          <input
            type="url"
            name="image"
            data-testid="edit-input-image"
            value={ image }
            onChange={ this.handleChange }
          />

          <button
            className="btnProfileEdit"
            type="button"
            name="btnSalvar"
            data-testid="edit-button-save"
            disabled={ btnSalvar }
            onClick={ this.handleClick }
          >
            Salvar
          </button>

        </form>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default ProfileEdit;
