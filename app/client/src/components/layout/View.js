import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Breadcrumb, Row, Col } from 'antd';
import './View.css';
import 'antd/dist/antd.css';

import Viewmain from './Viewmain';
import Viewleft from './Viewleft';
import News from '../newsitem/news';

import * as  newsActions from '../../actions/newsAction';

const { Content, Footer } = Layout;

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "Xã hội",
    };
  }
  componentDidMount() {
    this.props.actions.getNews();
    this.props.actions.getNewsByCategory(this.state);
    // this.props.actions.getNewByID(this.props.match.params.new_id);
  }
  componentDidUpdate(){
    if (this.props.match.params.new_id) {
      this.props.actions.getNewByID(this.props.match.params.new_id);
    }
  }
  render() {
    const { newsitems, itemsbycategory, newbyid } = this.props;
    console.log(itemsbycategory);
    return (
      <div>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <div>
              <Row>
                <Col span={16} push={8}>
                  <Router>
                    {/* <Viewmain viewnews={newsitems} /> */}
                      <Route exact
                        path="/news/:new_id"
                        component={News} />
                      <Route path="/"
                        exact
                        component={() => <Viewmain viewnews={newsitems} />} />
                  </Router>
                </Col>
                <Col span={8} pull={16}>
                  <Viewleft items={itemsbycategory} />
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

const mapDispatchToProps = dispath => {
  return {
    actions: bindActionCreators({
      getNews: newsActions.getNews,
      getNewsByCategory: newsActions.getNewsByCategory,
      getNewByID: newsActions.getNewByID
    },
      dispath)
  }
}

const mapStateToProps = state => ({
  newsitems: _.get(state, ["newsReducer", "newsitems"]),
  itemsbycategory: _.get(state, ["newsReducer", "itemsbycategory"]),
  newbyid: _.get(state, ["newsReducer", "newbyid"])
});

export default connect(mapStateToProps, mapDispatchToProps)(View);