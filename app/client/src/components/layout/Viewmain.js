import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Row, Col, Card, message } from 'antd';
import './Viewmain.css';
import 'antd/dist/antd.css';

class Viewmain extends Component {

    constructor(props) {
        super(props);
        this.state = {
            item_title: "",
            item_content: ""
        };
        // this.onSubmit = this.onSubmit.bind(this);
    }
    render() {
        const views = this.props.viewnews.map(view => (
            <Col span={12}>
                <div className="card-item" style={{ background: '#ECECEC', padding: '30px' }}>
                    <Link to={`/news/${view._id}`}>
                    <Card
                        hoverable
                        title={view.title}
                        bordered={false}
                        style={{ width: 300, height: 220 }}
                    >
                        <p style={{ height: 100 }}>{view.content}</p>
                    </Card>
                    </Link>
                </div>
            </Col>
        ));
        return (
            <div>
                <Row>
                    {views}
                </Row>
            </div>
        )
    }
}
export default connect(null, null)(Viewmain);