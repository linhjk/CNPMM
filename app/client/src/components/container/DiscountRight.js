import React, { Component } from 'react';
import './DiscountRight.css';
import {
    Container, Row, Col, Card, CardImg, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import img from '../img/pic1.jpg';

const url = img;

class DiscountRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {
                    id: "",
                    name: "Product one",
                    description: "if the user for some reason cannot view it",
                    imageUrl: url
                },
                {
                    id: "",
                    name: "Product one",
                    description: "if the user for some reason cannot view it",
                    imageUrl: url
                },
                {
                    id: "",
                    name: "Product one",
                    description: "if the user for some reason cannot view it",
                    imageUrl: url
                },
                {
                    id: "",
                    name: "Product one",
                    description: "if the user for some reason cannot view it",
                    imageUrl: url
                },
                {
                    id: "",
                    name: "Product one",
                    description: "if the user for some reason cannot view it",
                    imageUrl: url
                },
            ]
        }
    }
    render() {
        const { products } = this.state;
        return (
            <div className="mainDiscount">
                <h2 className="main-title">Discount 20%</h2>
                <Container>
                    <Col>
                        {products.map(product =>
                            <Row >
                                <Card className="content-products">
                                    <CardImg className="img-products" src={product.imageUrl} />
                                    <div className="text">
                                    <CardBody>
                                        <CardTitle>{product.name}</CardTitle>
                                        <CardText>{product.description}</CardText>
                                    </CardBody>
                                    </div>
                                </Card>
                            </Row>)}
                    </Col>
                </Container>
            </div>
        );
    }
}

export default DiscountRight;