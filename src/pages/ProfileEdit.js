import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    user: {},
  }

  specialObj = {

  }

  handleChange = ({ target: { name, value } }) => {
    console.log(value)
    this.setState({
      user: {
        name: value,
        email: value + 1,
        description: value + 2
      },
    });
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({
      loading: true,
    }, async () => {
      const userInfos = await getUser();
      this.setState({
        loading: false,
        user: userInfos,
      });
    });
  }

  render() {
    const{
      user: {
        name,
        email,
        image,
        description,
      },
      loading,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        PROFILE EDIT
        <br/>

        <form>
          Nome:
          <input 
            type="text"
            name="nome"
            data-testid="edit-input-name"
            // value={ name }
            onChange={ this.handleChange }
          />

          Email:
          <input 
            type="email"
            name="email"
            data-testid="edit-input-email"
            onChange={ this.handleChange }
          />

          Descrição:
          <input 
            type="text"
            name="description"
            data-testid="edit-input-description"
            onChange={ this.handleChange }
          />

          Foto:
          <input 
            type="url"
            name="image"
            data-testid="edit-input-image"
            onChange={ this.handleChange }
          />

          <button
            type="button"
            name="btnSalvar"
            data-testid="edit-button-save"
            // onClick={}
          >
            Salvar
          </button>

        </form>
      </div>
    );
  }
}

export default ProfileEdit;
