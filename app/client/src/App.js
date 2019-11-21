import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card } from 'antd';
import { createBrowserHistory } from 'history';
import {PrivateRoute} from './route/PrivateRoute';

import { Provider } from 'react-redux';
import configureStore from './store';

import View from './components/layout/View';
import { CartProvider } from './components/contexts/Cart';
import Login from './components/login/Login';
import BestSeller from './components/container/BestSeller';
import Navbar from './components/layout/Navbar'

const { Header, Content, Footer } = Layout;
const history = createBrowserHistory();

class App extends Component {
  render() {
    const currentUser=localStorage.getItem("currentToken");
    return (
      
      <Router history={history}>
          <Layout style={{ minHeight: '100vh' }}>
            <Layout>
              <Content style={{ margin: '0 16px' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <PrivateRoute path="/news" component={View}/>
                <Route path="/" exact component={Login} />
                
                </div>
              </Content>
            </Layout>
          </Layout>
          
      </Router>
      
      // <Router>
      //   <Layout className="layout">
      //     <Navbar />
      //     <Route path="/" exact component={Login} />
      //     <div className="container">
      //       <Route exact path="/news" component={View} />
      //     </div>
      //   </Layout>
      //   {/* <BestSeller/> */}
      // </Router>
    );
  }
}
export default App;
