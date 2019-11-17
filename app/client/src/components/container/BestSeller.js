import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";

import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import img from '../img/pic1.jpg';
import './BestSeller.css';

import * as  profileAction from '../../actions/profileAction';


class BestSeller extends Component {
    componentDidMount() {
        console.log(this.props)
        this.props.actions.getProfile();
    }

    render() {
        const { profiles } = this.props;
        console.log(profiles);
        return (
            <div className="main">
                <h2 className="main-title">Sản phẩm bán nhiều nhất</h2>
                <Container>
                    <Row>
                        {profiles.map(profile =>(
                            <Col sm="4">
                                <Card>
                                    <CardImg top width="100%" src = {img} />
                                    <CardBody>
                                        <CardTitle>{profile.name}</CardTitle>
                                        <CardText>{profile.username}</CardText>
                                        <Button>Button</Button>
                                    </CardBody>
                                </Card>
                            </Col>))
                        }
                    </Row>
                </Container>
            </div>

        )
    }
}

const mapDispatchToProps = dispath =>{
    return {
        actions: bindActionCreators({
            getProfile: profileAction.getProfile
        }, 
    dispath)
    }
}

const mapStateToProps = state => ({
    profiles: _.get(state,["profileReducer","profiles"])
});
export default connect(mapStateToProps, mapDispatchToProps)(BestSeller);