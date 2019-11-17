import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";

import { Layout, Menu, Breadcrumb, Button, Row, Col, Card } from 'antd';
import './View.css';
import 'antd/dist/antd.css';
import img from '../img/pic1.jpg';


import Viewmain from './Viewmain';
import Viewleft from './Viewleft';
import Navbar from './Navbar';
import * as  newsActions from '../../actions/newsAction';


const { Header, Content, Footer } = Layout;

class View extends Component {
  componentDidMount(){
    this.props.actions.getNews();
  }
  render() {
    const {newsitems} = this.props;
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <div>
              <Row>
                <Col span={16} push={8}>
                  <Viewmain viewnews={newsitems}/>
                </Col>
                <Col span={8} pull={16}>
                  <Viewleft />
                </Col>
              </Row>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </div>
    );
  }
}

const mapDispatchToProps = dispath =>{
  return {
      actions: bindActionCreators({
          getNews: newsActions.getNews
      }, 
  dispath)
  }
}

const mapStateToProps = state => ({
  newsitems: _.get(state,["newsReducer","newsitems"])
});

export default connect(mapStateToProps, mapDispatchToProps)(View);