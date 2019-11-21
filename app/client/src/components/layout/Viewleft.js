import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Card } from 'antd';
import './Viewleft.css';
import 'antd/dist/antd.css';
import img from '../img/pic1.jpg'

class ViewLeft extends Component {
    render() {
        const newsitems = this.props.items.map(item => (
            <Card
                hoverable
                style={{ width: 370 }}
            >
                <img className="pic-news" src={item.image} />
                <div className="content-news">
                    <div>
                        <h5>{item.title}</h5>
                    </div>
                    <div >
                        <p style={{ height: 65 }}>{item.content}</p>
                    </div>
                </div>
            </Card>
        ));
        return (
            <div>
                <div className="viewleft-title">
                    <h2>Tin tức</h2>
                </div>
                <div>
                    {newsitems}
                </div>
            </div>
        )
    }
}
export default connect(null, null)(ViewLeft);