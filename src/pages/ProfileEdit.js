import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    btnSalvar: true,
    loading: false,
    user: {
      name: '',
      email: '',
      description: '',
      image: '',
    },
  }

  validateInputs = () => {
    const {
      name,
      email,
      description,
      image,
    } = this.state;

    // console.log('Nome:', name)
    // console.log('Email:', email)
    // console.log('Description:', description)
    // console.log('Imagem:', image)
    
    // let regex = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i')
    const emailRegex =  new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
    // const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const validName = name.length > 0;

    const validEmail = emailRegex.test(email);

    const validDescription = description.length > 0;
    const validImage = image.length > 0;

    // console.log('Nome:', validName)
    // console.log('Email:', validEmail)
    // console.log('Description:', validDescription)
    // console.log('Imagem:', validImage)
    // console.log(' ')


    return !(validName && validEmail && validDescription && validImage);
  }

  handleChange = ({ target: { name, value } }) => {
    // console.log(name)
    // console.log(name, value)

    // console.log('USER OBJ:', userObj)
    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        btnSalvar: this.validateInputs(),
      });
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
      btnSalvar,
    } = this.state;

    return (
      <div data-testid="page-profile-edit">
        PROFILE EDIT
        <br/>

        <form>
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
            valur={ image }
            onChange={ this.handleChange }
          />

          <button
            type="button"
            name="btnSalvar"
            data-testid="edit-button-save"
            disabled={ btnSalvar }
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
