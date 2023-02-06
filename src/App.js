import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import './App.css';

class App extends React.Component {
  render() {
    // const {
    //   btnEntrar,
    //   loading,
    // } = this.state;

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/search" component={ Search } />
          <Route
            path="/album/:id"
            render={ (props) => <Album { ...props } /> }
          />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/" component={ Login } />
          <Route path="*" component={ NotFound } />
          {' '}
          <Login />
        </Switch>
      </div>
    );
  }
}

export default App;
