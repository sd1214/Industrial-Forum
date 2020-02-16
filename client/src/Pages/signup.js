import React from 'react';
import axios from 'axios';
import './css/signup.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class User extends React.Component{
 state={
   email:"",
   username:"",
   password:""
 };

 resetUserInput= ()=>{
  this.setState({
    email:"",
    username:"",
    password:""
  });
}

 onChangeEmail=(e)=>{
   this.setState({
     email:e.target.value
   });
 }
 onChangeUsername=(e)=>{
  this.setState({
    username:e.target.value
  });
}
onChangePassword=(e)=>{
  this.setState({
    password:e.target.value
  });
}
//  handleChange=(event)=>{
//     const target=event.target;
//     const name=target.name;
//     const value=target.value;
//    this.setState({
//      [name]:value 
//    });
//   };
onSubmit=(event)=>{
  event.preventDefault();//prevent browser from refreshing
  const detail={
    email:this.state.email,
    username:this.state.username,
    password:this.state.password
  };

  console.log(detail);

  //http call
  // axios({
  //   url:'localhost:3000/signup/newUser',
  //   method:'POST',
  //   data:detail
  // })
  axios.post('/signup/newUser', detail)
  .then(()=>{
    console.log('Data has been sent to the server');
    this.resetUserInput();
  })
  .catch(()=>{
    console.log('Internal server error');
  });
  window.location = '/forum';
};



  render(){
    return(
      <div className="base"> 
      <Card id="2" className="card2">
        <h1>Sign Up</h1><br/><br/>
        <Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control type="email"
                  placeholder="Enter email"
                  required
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  />
  </Form.Group>
  <Form.Group controlId="formGroupUsername">
    <Form.Label>User Name <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control type="text"
                  placeholder="Enter Username"
                  required
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password <span style={{color:"red"}}>*</span></Form.Label>
    <Form.Control type="password" 
                  placeholder="Password" 
                  required
                  value={this.state.password}
                  onChange={this.onChangePassword} />
  </Form.Group>
  <div className="bttn">
  <Button  variant="primary" 
           type="submit"
           onClick={this.onSubmit}
           >
    Submit Form
  </Button>
  </div>
</Form>      
      </Card>
          {/* <div id="login_box">
           <h1>Sign Up</h1>
          <form  className="form" action='sign_up.php' method='POST'>
            <label class="notice">Please fill in the form to create an account</label>
            <br/><br/>
           <input type="text" name="username" id="username" placeholder="Username" required />
           <input type="text" name="number" id="number" placeholder="Mobile Number" required />
           <input type="email" name="email" id="email" placeholder="Email" required />
           <input type="password" name="password" id="password" placeholder="Password" required />
           <input type="password" name="r_password" id="r_password" placeholder="Re-enter Password" required />
           <button class="signup" name="signup" type="submit" id="signup" onclick="isremember()">Sign Up</button>
           <a href="home_page.php" class="cancel">Cancel</a>
         </form>
    </div>
    <p class="text">Already a user? <a class="a" href='#'>Login</a></p> */}
    </div>
    )
  }
}
export default User;