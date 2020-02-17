import React from 'react';
import logo from "../img/logo.jpeg";
import forum from "../img/forum.jpg";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/post.css';
import axios from 'axios';


class App extends React.Component{
     state={
        title:"",
        date:"Just Now",
        newItem:"",
        list:[]
     };
      
     resetUserInput=()=>{
       this.setState({
        title:"",
        date:"Just Now",
        newItem:"",
        list:[]
      })
      }
      
      componentDidMount(){
        axios.get('/forum')
      .then(res=>{
        var list=[...this.state.list]; //... is spread attribute
        list = res.data;
        console.log("res");
        console.log(res.data);
        this.setState({
          list 
        });
       })
       .catch(()=>{
        console.log('Internal server error');
        this.resetUserInput();
      });
      }
  

      timeAgo = (date)=>{
      let currentDate = new Date();
      date = new Date(date);
      let yearDiff = currentDate.getFullYear() - date.getFullYear();
    
      if(yearDiff>0)
        return `${yearDiff} year${yearDiff==1? "":"s"} ago`;
      
      let monthDiff = currentDate.getMonth() - date.getMonth();
      if(monthDiff>0)
        return `${monthDiff} month${monthDiff == 1 ? "" : "s"} ago`;
      
      let dateDiff = currentDate.getDate() - date.getDate();
      if (dateDiff > 0)
        return `${dateDiff} day${dateDiff == 1 ? "" : "s"} ago`;
      
      let hourDiff = currentDate.getHours() - date.getHours();
      if (hourDiff > 0)
        return `${hourDiff} hour${hourDiff == 1 ? "" : "s"} ago`;
    
      let minuteDiff = currentDate.getMinutes() - date.getMinutes();
      if (minuteDiff > 0)
        return `${minuteDiff} minute${minuteDiff == 1 ? "" : "s"} ago`;
      return `a few seconds ago`;
    };

    onChangeTitle=(e)=>{
      this.setState({
        title:e.target.value
      })
    };
    onChangeText=(e)=>{
      this.setState({
        newItem:e.target.value
      })
    };         
    
    onSubmit=(e)=>{
      
      const detail={
         title:this.state.title,
         newItem:this.state.newItem,
         date:this.timeAgo(new Date()),
      }
      console.log(detail);
      axios.post("/forum/add",detail)
      .then(()=>{
        console.log('Data has been sent to the server');
        this.resetUserInput();
      })
      axios.get('/forum')
      .then(res=>{
        var list=[...this.state.list]; //... is spread attribute
        list = res.data;
        console.log(list);
        // console.log(res.data);
        this.setState({
          list 
        });
       })
       .catch(()=>{
        console.log('Internal server error');
        this.resetUserInput();
      });
  }

  render()
  {return (
      <div className="body">
        <img src={logo}  className="logo" />
        <img src={forum} className="forum" />
        <div className="container">
        <Card className="text-center" style={{ width: '75rem' }}>
         <Card.Body>
           <Card.Title><input className="title"
                              type="text"
                              placeholder="Author Name..."
                              value={this.state.title}
                              onChange={this.onChangeTitle}
                              /></Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted text-right">{this.state.date}</Card.Subtitle> */}
        <Card.Text>
              <textarea
                       className="input-text"
                       placeholder="Write Something Here...."
                       required
                       value={this.state.newItem}
                       onChange={this.onChangeText}
               ></textarea>
           </Card.Text>
           <Button variant="primary" onClick={this.onSubmit}
                  disabled={!this.state.newItem.length} >POST</Button>
         </Card.Body>
        </Card>
          
        <div className="list">
            <ul>
              {this.state.list.map(item =>{
                // console.log("item");
                // console.log(this.state.list);
                return(
                    <div className="box">
             <Card style={{ width: '70rem' }}>
                <Card.Body key={item.title}>
                <Card.Subtitle className="mb-2 text-muted text-right">{this.timeAgo(item.date)}</Card.Subtitle>
                  <Card.Title style={{fontWeight:"900"},{textTransform:"uppercase"},{color:"#0377fc"}}>Author: @{item.title}</Card.Title>
              
                  <Card.Text > {item.newItem} </Card.Text>
                  <Card.Link href="#" style={{color:"#081940"},{fontWeight:"700"}}>Comment</Card.Link>
                 </Card.Body>
             </Card>
             </div>
                )
              })}
             
            </ul>
          </div>

        </div>
      </div>
      
    )
  }
}
export default App;
