import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from "lodash";
import { bindActionCreators } from 'redux';

import { Layout, Menu, Button } from 'antd';
import './Navbar.css';
import 'antd/dist/antd.css';
import img from '../img/pic1.jpg';
import { Link } from 'react-router-dom';

import * as  newsActions from '../../actions/newsAction';


const { Header } = Layout;

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category_name: "Xã hội",
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.props.actions.getNewsByCategory(this.state);
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.category_name !== prevState.category_name) {
            this.props.actions.getNewsByCategory(this.state);
        }
    }
    onSubmit = ({ key }) => {
        console.log("key", key);
        this.setState({
            category_name: key
        });
        this.props.actions.getNewsByCategory(this.state);
    };
    render() {
        const { itemsbycategory } = this.props;
        return (
            <Header>
                <Link to="/">
                    <img className="img-logo" src={img} />
                </Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={this.onSubmit}
                    defaultSelectedKeys={["Xã hội"]}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="Xã hội">
                        {/* <Link to="/xahoi"> */}
                            Xã hội
                        {/* </Link> */}
                    </Menu.Item>
                    <Menu.Item key="Thể thao">
                        {/* <Link to="/thethao"> */}
                            Thể thao
                        {/* </Link> */}
                    </Menu.Item>
                    <Menu.Item key="Công nghệ">
                        {/* <Link to="/congnghe"> */}
                            Công nghệ
                        {/* </Link> */}
                    </Menu.Item>
                    <div className="btn-login-resgister">
                        <Button type="primary">
                            <Link to="/login">
                                Đăng nhập
                            </Link>
                        </Button> {' '}
                        <Button type="danger">
                            Đăng Ký
                        </Button>
                    </div>
                </Menu>
            </Header>
        )
    }
}

const mapDispatchToProps = dispath => {
    return {
        actions: bindActionCreators({
            getNewsByCategory: newsActions.getNewsByCategory
        },
            dispath)
    }
}
const mapStateToProps = state => ({
    itemsbycategory: _.get(state, ["newsReducer", "itemsbycategory"])
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);