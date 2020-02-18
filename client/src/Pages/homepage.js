import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './css/post.css';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';

class App extends React.Component {
  state = {
    title: "",
    date: "Just Now",
    newItem: "",
    list: []
  };

  resetUserInput = () => {
    this.setState({
      title: "",
      date: "Just Now",
      newItem: "",
      list: []
    })
  }

  componentDidMount() {
    axios.get('/forum')
      .then(res => {
        var list = [...this.state.list]; //... is spread attribute
        list = res.data;
        list.reverse();
        console.log("res");
        console.log(res.data);
        this.setState({
          list
        });
      })
      .catch(() => {
        console.log('Internal server error');
        this.resetUserInput();
      });
  }
  onLogin = () => {
    window.location("/login");
  }

  timeAgo = (date) => {
    let currentDate = new Date();
    date = new Date(date);
    let yearDiff = currentDate.getFullYear() - date.getFullYear();

    if (yearDiff > 0)
      return `${yearDiff} year${yearDiff == 1 ? "" : "s"} ago`;

    let monthDiff = currentDate.getMonth() - date.getMonth();
    if (monthDiff > 0)
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

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    })
  };
  onChangeText = (e) => {
    this.setState({
      newItem: e.target.value
    })
  };

  onSubmit = (e) => {

    const detail = {
      title: this.state.title,
      newItem: this.state.newItem,
      date: this.timeAgo(new Date()),
    }
    console.log(detail);
    axios.post("/forum/add", detail)
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInput();
      })
    axios.get('/forum')
      .then(res => {
        var list = [...this.state.list]; //... is spread attribute
        list = res.data;
        list.reverse();
        console.log(list);
        // console.log(res.data);
        this.setState({
          list
        });
      })
      .catch(() => {
        console.log('Internal server error');
        this.resetUserInput();
      });
  }

  render() {
    return (

      <div className="body">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="https://www.edgistify.com">Edgistify</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
        <Container>
          <Jumbotron>
            <p style={{ color: "#25437a" }}><div style={{ fontWeight: "700" }}>About this page...</div></p>
            <p style={{ color: "Black" }}>When it comes to supply chain and logistics, a lot of the people don’t know what actually
          that is. The best way to learn about new things is to read about it and we at Edgistify have
collected three years of ground intelligence that we want to share.</p>
            <p style={{ color: "blue" }}>
              Please login through your account to share a post with us.
  </p>
            <p>
              <Button variant="primary"><a href="/login" style={{ color: "white" }}>Login</a></Button>
            </p>
          </Jumbotron>
          <div className="list">
            <ul>
              {this.state.list.map(item => {
                // console.log("item");
                // console.log(this.state.list);
                return (
                  <div className="box">
                    <Card style={{ width: '70rem' }}>
                      <Card.Body key={item.title}>
                        <Card.Subtitle className="mb-2 text-muted text-right">{this.timeAgo(item.date)}</Card.Subtitle>
                        <Card.Title style={{ fontWeight: "900" }, { textTransform: "uppercase" }, { color: "#0377fc" }}>Author: @{item.title}</Card.Title>

                        <Card.Text > {item.newItem} </Card.Text>
                        <Card.Link href="#" style={{ color: "#081940" }, { fontWeight: "700" }}>Comment</Card.Link>
                      </Card.Body>
                    </Card>
                  </div>
                )
              })}

            </ul>
          </div>


        </Container>
      </div>
    )
  }
}
export default App;
