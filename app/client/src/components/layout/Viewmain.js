import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Card, message } from 'antd';
import './Viewmain.css';
import 'antd/dist/antd.css';
import img from '../img/pic1.jpg'

class Viewmain extends Component {
    componentDidMount(){
        const currentToken=localStorage.getItem("currentToken");
        
    }
    render() {
        //sconst views = this.props.viewnews.map(view => (
            // <Col span={12}>
            //     <div className="card-item" style={{ background: '#ECECEC', padding: '30px' }}>
            //         <Card title={view.title} bordered={false} style={{ width: 300 }}>
            //             <p>{view.content}</p>
            //         </Card>
            //     </div>
            // </Col>
        //));
        return (
            <div>
                <Row>
                    <Col span={24}>
                        col-12
                    </Col>
                </Row>
                <Row>
                    {/* {views} */}
                </Row>
            </div>
        )
    }
}
export default connect(null, null)(Viewmain);