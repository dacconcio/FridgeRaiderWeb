import React, { Component, Fragment } from 'react';
import { exchangeTokenForAuth } from '../store';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Nav from './Nav';
/*
import Home from './Home';
import Login from './Login';
import RegisterUser from './RegisterUser';
import RegistrationSuccessful from './RegistrationSuccessful';
import MyAccount from './MyAccount';
import MyRecipes from './MyRecipes';
*/

class App extends Component {

  componentDidMount() {
    this.props.exchangeTokenForAuth();
  }

  render() {
    return (
      <Router>
        <Fragment>
          <CssBaseline />
          <Route path="/" render={({ history }) => <Nav history={history} />} />
          {/*
          <Switch>
            <Route path="/login" render={({ history }) => <Login history={history} />} />
            <Route path="/register" component={RegisterUser} />
            <Route path="/registerSuccess" component={RegistrationSuccessful} />
            <Route exact path="/myaccount" component={MyAccount} />
            <Route exact path="/myrecipes" component={MyRecipes} />
            <Route exact path="/" component={Home} />
          </Switch>
          */}
        </Fragment>
      </Router>
    );
  }
}

const styles = {
  "@global": {
    body: {
      backgroundColor: "white"
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    exchangeTokenForAuth: () => dispatch(exchangeTokenForAuth())
  }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(App))