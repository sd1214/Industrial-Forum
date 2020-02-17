import React from 'react';
import axios from 'axios';
import './css/signup.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class User extends React.Component {
  state = {
    username: "",
    password: ""
  };

  resetUserInput = () => {
    this.setState({
      username: "",
      password: ""
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
    console.log("sahf");
    event.preventDefault();//prevent browser from refreshing
    const detail = {
      username: this.state.username,
      password: this.state.password
    };

    if (!detail.username || !detail.password) {
      alert("Please fill all the details")
      event.preventDefault();
    }
    else {
      axios.get('/login/log', {
        params: {
          username: detail.username,
          password: detail.password
        }
      })
        .then(res => {
          console.log(res.data);
          if (res.data.msg == "User not Found" || res.data.msg == "Wrong Password") {
            alert("Login Failed, Incorrect Username and Password");
            window.location = '/login';
          }
          else if (res.data.msg == "Authentication Successful") {
            alert("Login Successful");
            window.location = '/forum';
          }
        })
        .catch(() => {
          console.log('Internal server error');
          alert("Login Failed, Incorrect Username and Password");
          window.location = '/login';
        });
    }
  };


  render() {
    return (
      <div className="base1">
        <Card className="card1">
          <h1 className="h">Login</h1><br />
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control type="text"
                placeholder="Enter Username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
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