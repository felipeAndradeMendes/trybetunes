import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Loading from './pages/Loading';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {

  state = {
    btnEntrar: true,
    loginName: '',
    loading: false,
  };

  handleChange = ({ target: { value, } }) => {
    // console.log(value)
    const { loginName } = this.state;
    this.setState({
      loginName: value,
      btnEntrar: loginName.length > 1 ? false : true,
    });
  }

  createUserFunc = async () => {
    const { loginName, loading } = this.state;
    // console.log('INICIOU A FUNÇÃO')
    this.setState({
      loading: true,
    });
    // console.log('CHAMOU O SETsTATE')
    await createUser({name: loginName});
    // console.log('ACABOU A FUNÇÃO ASYNC')

    this.setState({
      loading: false,
    });
    // console.log('CLIQUEI')
    <Redirect to="/search" />
  }

  render() {
    const {
      btnEntrar,
      loading,
    } = this.state;

    if (loading) return <Loading />
    return (
      <div>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/"
            render={ () => 
            <Login 
              disable={ btnEntrar }
              handleChange={ this.handleChange }
              handleClick={ this.createUserFunc }
            /> } 

          />
          <Route path="*" component={ NotFound } />
        </Switch>


      </div>
    );
  }
}

export default App;
