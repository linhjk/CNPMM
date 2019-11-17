import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import './Login.css';

class Login extends Component {
    render() {
        return (
            <div className="signup-container">
                <div className="signup-input">
                    <Form >
                        <div>
                            <h2>Đăng Nhập</h2>
                        </div>
                        <div>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword">Password</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="Your Password" />
                            </FormGroup>
                        </div>
                        <div className="btn-submit">
                            <Button color="secondary">Trở lại</Button>{' '}
                            <Button color="success">Đăng nhập</Button>
                        </div>
                        <div >
                            <Button color="primary" size="lg" block>Đăng nhập Facebook</Button>
                            <Button color="secondary" size="lg" block>Đăng nhập Gmail</Button>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}
export default Login;