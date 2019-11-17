import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card } from 'antd';

import { Provider } from 'react-redux';
import configureStore from './store';

import View from './components/layout/View';
import { CartProvider } from './components/contexts/Cart';
import Login from './components/login/Login';
import BestSeller from './components/container/BestSeller';
import Navbar from './components/layout/Navbar'

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Navbar />
          <Route path="/" exact component={View} />
          <div className="container">
            <Route exact path="/login" component={Login} />
          </div>
        </Layout>
        {/* <BestSeller/> */}
      </Router>
    );
  }
}
export default App;
