import React from 'react';
import { getUser } from '../services/userAPI';
import { Link } from 'react-router-dom';

class Profile extends React.Component {

  state = {
    loading: false,
    user: {},
  }

  componentDidMount() {
    this.showProfile();
  }

  showProfile = () => {
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
    const {
      user: {
        name,
        email,
        description,
        image,
      }
    } = this.state;

    return (
      <div data-testid="page-profile">
        PROFILE
        <br/>
        <div>
        <img 
          data-testid="profile-image" 
          src="url-to-image"
          alt={ name }
        />
        <Link to="/profile/edit">
          <p>Editar perfil</p>
        </Link>
        </div>

        <div>
          <h3>
            Nome
          </h3>
          <p>
            { name }
          </p>
        </div>

        <div>
          <h3>
            Email
          </h3>
          <p>
            { email }
          </p>
        </div>
        <div>
          <h3>
            Descrição
          </h3>
          <p>
            { description }
          </p>
        </div>
      </div>
    );
  }
}

export default Profile;
