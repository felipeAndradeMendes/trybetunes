import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  state = {
    loginHeader: '',
    loading: true,
  }

  
  getUserFunc = async () => {
   
    const login = await getUser();
    this.setState({
      loginHeader: login.name,
      loading: false,
    });
  }

  componentDidMount() {
   this.getUserFunc() 
  }



render() {
  const { loginHeader, loading } = this.state;   
  if (loading) return <Loading />;

    return (
      <header data-testid="header-component">
        HEADER
        <p
          data-testid="header-user-name"
        > 
          { loginHeader } 
        </p>
      </header>
    );
  }
}

export default Header;
