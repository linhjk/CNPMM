import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card } from 'antd';
import './Viewleft.css';
import 'antd/dist/antd.css';
import img from '../img/pic1.jpg'
const { Meta } = Card;

class ViewLeft extends Component {
    render() {
        return (
            <div>
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </div>
        )
    }
}
export default ViewLeft;