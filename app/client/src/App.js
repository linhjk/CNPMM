import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card } from 'antd';
import { createBrowserHistory } from 'history';
import { PrivateRoute } from './route/PrivateRoute';


import { Provider } from 'react-redux';
import configureStore from './store';

import View from './components/layout/View';
import { CartProvider } from './components/contexts/Cart';
import Login from './components/login/Login';
import AppNews from './components/manageNews/ManageNews'
import BestSeller from './components/container/BestSeller';
import Navbar from './components/layout/Navbar'

import ManageNews from './components/manageNews/ManageNews';

import News from './components/newsitem/news'


const { Header, Content, Footer } = Layout;
const history = createBrowserHistory();

class App extends Component {
  render() {
    const currentUser = localStorage.getItem("currentToken");
    return (
      <Router history={history}>
        {currentUser?
        
        <Layout className="layout">
          <Navbar />
          <Route path="/" exact component={View} />
          
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/managenew" component={ManageNews} />
            
          
        </Layout>
       
        :
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
          <Navbar />
          <PrivateRoute exact path="/managenew" component={ManageNews} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={View} />
              </div>
        }
      </Router>

   
    );
  }
}
export default App;
