import React, { Component } from 'react';
import { Layout, Menu, Button, Row, Col, Card } from 'antd';

import './Navbar.css';
import 'antd/dist/antd.css';
import img from '../img/pic1.jpg';
import { Link } from 'react-router-dom';
const { Header } = Layout;

class Navbar extends Component {
    render() {
        return (
            <Header>
                <Link to="/">
                    <img className="img-logo" src={img} />
                </Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1">
                        <Link to="/">
                            Xã hội
                         </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        Thể Thao
                    </Menu.Item>
                    <Menu.Item key="3">
                        Công nghệ
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
export default Navbar;