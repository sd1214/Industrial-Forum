import React from 'react';
import axios from 'axios';
import './css/signup.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class App extends React.Component{
 state={
   title:"",
   body:"",
   posts:[]
 };
 handleChange=(event)=>{
    const target=event.target;
    const name=target.name;
    const value=target.value;
   this.setState({
     [name]:value 
   });
  };
submit=(event)=>{
  event.preventDefault();//prevent browser from refreshing
  const payload={
    title:this.state.title,
    body:this.state.body
  };
  //http call
  axios({
    url:'/api/save',
    method:'POST',
    data:payload
  })
  .then(()=>{
    console.log('Data has been sent to the server');
    this.resetUserInput();
  })
  .catch(()=>{
    console.log('Internal server error');
  });;
};

resetUserInput= ()=>{
  this.setState({
   title:"",
   body:""
  });
}

  render(){
    return(
      <div className="base"> 
      <Card id="2" className="card2">
        <h1>Sign Up</h1><br/><br/>
        <Form>
  <Form.Group controlId="formGroupEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
  </Form.Group>
  <Form.Group controlId="formGroupPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <div className="bttn">
  <Button  variant="primary" type="submit">
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
export default App;