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
      loginHeader: login.name,
      loading: false,
    });
  };

  render() {
    const { loginHeader, loading } = this.state;
    if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        HEADER
        <p data-testid="header-user-name">
          { loginHeader }
        </p>
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">
              Search
            </Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favorites
            </Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">
              Profile
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
