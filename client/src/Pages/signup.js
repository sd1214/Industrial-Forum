import React from 'react';
import axios from 'axios';
import './css/signup.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

class User extends React.Component {
  state = {
    email: "",
    username: "",
    password: ""
  };

  resetUserInput = () => {
    this.setState({
      email: "",
      username: "",
      password: ""
    });
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
    });
  }
  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  }
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();//prevent browser from refreshing
    const detail = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    };
    if (!detail.email || !detail.username || !detail.password) {
      alert("Please fill all the details")
      event.preventDefault();
    } else {
      console.log(detail);
      axios.post('/signup/newUser', detail)
        .then((res) => {
          if (res.data.msg === 'Username already existing') {
            alert("Username already existing");
            
          }
          else if (res.data.msg === 'Email-Id already Registered') {
            alert("Email-Id already Registered");
          }
          else {
            console.log('Data has been sent to the server');
            this.resetUserInput();
            window.location = '/forum';
          }
        })
        .catch(() => {
          console.log('Internal server error');
        });
    }
  };



  render() {
    return (
      <div className="base">
        <Card id="2" className="card2">
          <h1>Sign Up</h1><br />
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email address <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="email"
                placeholder="Enter email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                reqiured
              />
            </Form.Group>
            <Form.Group controlId="formGroupUsername">
              <Form.Label>User Name <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="text"
                placeholder="Enter Username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password <span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control type="password"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={this.onChangePassword} />
            </Form.Group>
            <div className="bttn">
              <Button variant="primary"
                type="submit"
                onClick={this.onSubmit}
              >
                Submit Form
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    )
  }
}
export default User;