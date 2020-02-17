import React from 'react';
import axios from 'axios';
import './css/signup.css';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
class User extends React.Component{
  state={
    username:"",
    password:""
  };
 
  resetUserInput= ()=>{
   this.setState({
     username:"",
     password:""
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
   console.log("sahf");
   event.preventDefault();//prevent browser from refreshing
   const detail={
     username:this.state.username,
     password:this.state.password
   };
   if(!detail.username || !detail.password)
   { 
     alert("Please fill all the details")
     event.preventDefault();
   }
   //console.log(detail);
 
   //http call
   // axios({
   //   url:'localhost:3000/signup/newUser',
   //   method:'POST',
   //   data:detail
   // })
   else{
   axios.get('/login/log',{
     params: {
       username : detail.username,
       password : detail.password
     }})
   .then(res=>{
     console.log(res.data);
     if(res.data.msg=="User not Found"||res.data.msg=="Wrong Password"){
      alert("Login Failed, Incorrect Username and Password");
      window.location = '/login';
     }
     else if(res.data.msg=="Authentication Successful"){
      alert("Login Successful");
       window.location = '/forum';
     }
    //  console.log('Login Successful');
    //  this.resetUserInput();
    //  alert("Login Successful");
    //  window.location = '/forum';
    
   })
   .catch(()=>{
     console.log('Internal server error');
     alert("Login Failed, Incorrect Username and Password");
     window.location = '/login';
   });
  }
 };
 

  render(){
    return(
      <div className="base1">
      <Card className="card1">
        <h1 className="h">Login</h1><br/>
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