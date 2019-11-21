import React from "react";
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import _ from "lodash";
import { connect } from 'react-redux';
//import { authenticationService } from '../../../service/authentication-service';
import "./login/style.css";

export default class test extends React.Component {
  baseUrl;

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoggedIn: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.baseUrl = process.env.DOMAIN_API_DEV;
  }
  

  componentDidMount(){

  }

  handleChange(event) {
    this.setState({username: event.target.value});
  }
  handleChangePass(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    axios
        .post('http://localhost:5000/auth/authenticate',
                {
                    username: this.state.username,
                    password: this.state.password
                }
        )
        .then(res =>{
            message.info(res.data.message)
            localStorage.setItem('currentToken',res.data.token)
            if(res.data.success==true){         
              const { from } = this.props.location.state || { from: { pathname: "/news" } };
              this.props.history.push(from);
            }
          }
        )
        .catch(err =>
            console.log(err)
        );
    event.preventDefault();
  }

  render() {
    return (
      <div className={"login-page"}>
      <Form onSubmit={this.handleSubmit} className={"login-form"}>
        <h3>Đăng nhập trang test</h3>
        <Form.Item>
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={this.state.username} onChange={this.handleChange}
            />
        </Form.Item>
        <Form.Item>
        
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={this.state.password} onChange={this.handleChangePass}
            />
        </Form.Item>
        <Form.Item>
          <a className="login-form-forgot" href={"#"}>
            Forgot password
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </div>
    );
  }
}