import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import perfil from '../images/perfil.jpg';

class Profile extends React.Component {
  state = {
    loading: false,
    user: {},
  };

  componentDidMount() {
    this.showProfile();
  }

  showProfile = () => {
    this.setState({
      loading: true,
    }, async () => {
      const userInfos = await getUser();
      this.setState({
        user: userInfos,
        loading: false,
      });
    });
  };

  render() {
    const {
      user: {
        name,
        email,
        description,
      },
      loading,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div className="profileContainer" data-testid="page-profile">
        <p className="titleProfile">PROFILE</p>
        <br />
        <div className="profileTop">
          <img
            className="imgProfile"
            data-testid="profile-image"
            src="url-to-image"
            // src={ perfil }
            alt={ name }
          />
          <Link className="linkProfile" to="/profile/edit">
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
