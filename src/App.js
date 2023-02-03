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

  

  render() {
    // const {
    //   btnEntrar,
    //   loading,
    // } = this.state;

    return (
      <div>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } /> 
          <Route path="*" component={ NotFound } />

            // <Login 
              // disable={ btnEntrar }
              // handleChange={ this.handleChange }
              // handleClick={ this.createUserFunc }
            // /> } 

          />
        </Switch>


      </div>
    );
  }
}

export default App;
