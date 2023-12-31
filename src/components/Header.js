import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loginHeader: '',
    loading: true,
  };

  componentDidMount() {
    this.getUserFunc();
  }

  getUserFunc = async () => {
    const login = await getUser();
    this.setState({
      loading: false,
    }, () => {
      this.setState({
        loginHeader: login.name,
      });
    });
  };

  render() {
    const { loginHeader, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        <div className="headerTop">
          <Link className="linktitleHeader" to="/">
            <h2 className="tituloHeader">Trybe Tunes</h2>
          </Link>
          <p className="usuarioNameheader" data-testid="header-user-name">
            { loginHeader }
          </p>
        </div>
        <ul className="navHeader">
          <li>
            <Link to="/search" className="linkNavHeader" data-testid="link-to-search">
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              className="linkNavHeader"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link to="/profile" className="linkNavHeader" data-testid="link-to-profile">
              Profile
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
