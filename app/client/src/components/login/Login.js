import React from "react";
import { Form, Icon, Input, Button, message } from 'antd';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as  loginAction from '../../actions/loginAction';
import _ from "lodash";
import { connect } from 'react-redux';
//import { authenticationService } from '../../../service/authentication-service';
import "./style.css";

export default class Login extends React.Component {
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
      const token=localStorage.getItem('currentToken');
      {if (token){
        const { from } = this.props.location.state || { from: { pathname: "/news" } };
              this.props.history.push(from);}
        // <Redirect to='/news' />
        // :
        // console.log("error")
      }
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
        <h3>Đăng nhập</h3>
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



// const mapDispatchToProps = dispath =>{
//   return {
//       actions: bindActionCreators({
//           loginAction: loginAction.login_Authentication
//       }, 
//   dispath)
//   }
// }

// const mapStateToProps = state => ({
//   newsitems: _.get(state,["newsReducer","newsitems"])
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);




// import React, { Component } from 'react';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import './Login.css';

// class Login extends Component {
//     constructor(props){
//         super(props);
//         this.state={

//         }
//     }
//     componentDidMount(){
        
//     }
//     render() {
//         return (
//             <div className="signup-container">
//                 <div className="signup-input">
//                     <Form >
//                         <div>
//                             <h2>Đăng Nhập</h2>
//                         </div>
//                         <div>
//                             <FormGroup>
//                                 <Label for="exampleEmail">Email</Label>
//                                 <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" />
//                             </FormGroup>
//                             <FormGroup>
//                                 <Label for="examplePassword">Password</Label>
//                                 <Input type="password" name="password" id="examplePassword" placeholder="Your Password" />
//                             </FormGroup>
//                         </div>
//                         <div className="btn-submit">
//                             <Button color="secondary">Trở lại</Button>{' '}
//                             <Button color="success">Đăng nhập</Button>
//                         </div>
//                         <div >
//                             <Button color="primary" size="lg" block>Đăng nhập Facebook</Button>
//                             <Button color="secondary" size="lg" block>Đăng nhập Gmail</Button>
//                         </div>
//                     </Form>
//                 </div>
//             </div>
//         )
//     }
// }
// export default Login;