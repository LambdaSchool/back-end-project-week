import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import notes from './components/noteList';
import SignIn from './components/signin';
import SignUp from './components/signup';
import SignOut from './components/signout';
import RequireAuth from './components/HOC/requireAuth';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import reducers from './reducers';

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <Router>
      <Route path="/" component={App} />
      <Route path="/signin" component={SignIn} />
      <Route path="/users" component={RequireAuth(notes)} />
      <Route path="/signout" component={SignOut} />
      <Route path="/signup" component={SignUp} />
    </Router>
  </Provider>,
  document.getElementById('root')
);


