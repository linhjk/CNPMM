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

const { Header, Content, Footer } = Layout;
const history = createBrowserHistory();

class App extends Component {
  render() {
    const currentUser = localStorage.getItem("currentToken");
    return (

      <Router history={history}>
        {currentUser?
        <Layout style={{ minHeight: '100vh' }}>
          <Navbar/>
          <Layout>
            <Content style={{ margin: '0 16px' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              <Route path="/managenew" exact component={ManageNews} />
                <Route path="/xahoi" exact component={View} />
                <Route path="/thethao" exact component={View} />
                <Route path="/congnghe" exact component={View} />
                <Route path="/news" component={View} />
                <Route path="/" exact component={Login} />
              </div>
            </Content>
          </Layout>
        </Layout>
        :
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                <Route path="/xahoi" exact component={View} />
                <Route path="/thethao" exact component={View} />
                <Route path="/congnghe" exact component={View} />
                <Route path="/news" component={View} />
                <Route path="/" exact component={Login} />
              </div>
        }
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
