import React from 'react';
import logo from "../img/logo.jpeg";
import forum from "../img/forum.jpg";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/post.css';

/*
function App(){
   return (
     <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" />
      </header>
     </div>
   );
  
}
*/

class App extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      newItem:"",
      list:[]
    };
  }
  addItem(todoValue)
  {
    if(todoValue !== "")
    {
      const newItem={
        id:Date.now(),
        value: todoValue,
        isDone:false
      };
      const list = [...this.state.list];
      list.push(newItem);

      this.setState({
        list,
        newItem:""
      });
    }
  }
  
  deleteItem(id){
    const list=[...this.state.list];
    const updatedlist= list.filter(item=> item.id!==id);
    this.setState({
      list:updatedlist
    });
  }

  updateInput(input){
    this.setState({newItem:input});
  }

  render()
  {return (
      <div className="body">
        <img src={logo}  className="logo" />
        <img src={forum} className="forum" />
        <div className="container">
        <Card className="text-center" style={{ width: '75rem' }}>
         <Card.Body>
           <Card.Title><input className="title" type="text"/></Card.Title>
           <Card.Subtitle className="mb-2 text-muted text-right">Date & Time</Card.Subtitle>
           <Card.Text>
              <textarea
                className="input-text"
                placeholder="Write Something Here...."
                required
                value={this.state.newItem}
                onChange={e => this.updateInput(e.target.value)}
               ></textarea>
           </Card.Text>
           <Button variant="primary" onClick={() => this.addItem(this.state.newItem)}
                  disabled={!this.state.newItem.length} >POST</Button>
         </Card.Body>
        </Card>
          
        <div className="list">
            <ul>
              {this.state.list.map(item=>{
                return(
                    <div className="box">
             <Card style={{ width: '70rem' }}>
                <Card.Body key={item.id}>
                  <Card.Title>Title</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Date & Time</Card.Subtitle>
                  <Card.Text > {item.value} </Card.Text>
                  <Card.Link href="#">Comment</Card.Link>
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
{/* <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title><input type="text"/></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card> */}