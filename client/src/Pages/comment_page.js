import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
class Comment extends React.Component {
  state = {
    parent_id: "",
    child_id:"",
    title: "",
    date: "Just Now",    ////write function for all onChange and designing
    post: "",
    newItem: "",
    list: [],
    n_date: "Just Now",
    comment_by: "",
    replied_to: ""
  };

  resetUserInput = () => {
    this.setState({
      title: "",
      date: "Just Now",
      post: "",
      newItem: "",
      list: [],
      n_date: "Just Now",
      comment_by: "",
      replied_to: ""
    })
  }

  componentDidMount() {
    // console.log(window.location.href)
    var url = new URL(window.location.href)
    var id = url.searchParams.get("id")
    this.setState({
      parent_id:id,
      child_id:id
    })
    // console.log("id",id)
    axios.get('/forum/comment_page/getItem', {
      params: {
        id: id
      }
    })
      .then(res => {
        this.setState({
          post: res.data[0].newItem,
          title: res.data[0].title,
          date: res.data[0].date,
        })
      })
    axios.get('/forum/comment_page', {
      params: {
        id: id
      }
    })
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
  onChangeCommented_by=(e)=>{
    this.setState({
      comment_by:e.target.value
    })
  };
  onChangeReplied_to=(e)=>{
    this.setState({
      replied_to:e.target.value
    })
  };
  onSubmit = (e) => {

    const detail = {
      parent_id: this.state.parent_id,
      child_id:this.state.child_id,
      comment_by: this.state.comment_by,
      newItem: this.state.newItem,
      n_date: "",
      replied_to: this.state.replied_to
    }
    console.log(detail);
    axios.post("/forum/comment_page/add", detail)
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInput();
      })
    axios.get('/forum/comment_page')
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
      <div className="body" style={{ backgroundColor: "#174527" }}>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="https://www.edgistify.com">Edgistify</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/signup">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
          <Nav>
            <h3><Badge variant="secondary">COMMENT SECTION</Badge></h3>
          </Nav>
        </Navbar>
        <Container>

          <Row>
            <Col>    {/*                                   post                                              */}
              <Card className="text-white bg-success mb-3" style={{ width: '19rem' }}>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted text-right">{this.timeAgo(this.state.date)}</Card.Subtitle>
                  <Card.Title style={{ color: "#022620" }}>Author: @{this.state.title}</Card.Title>
                  <Card.Text >
                    {this.state.post}
                  </Card.Text>
                </Card.Body>
              </Card><br />
            </Col>
            <Col>
              <Row>
                <Col>    {/*                                 write a Comment                                             */}
                  <Card className="text-center" style={{ width: '22rem' }}>
                    <Card.Body>
                      <Card.Title><input className="input-sm"
                        type="text"
                        placeholder="Comment by..."
                        value={this.state.comment_by}
                        onChange={this.onChangeCommented_by}
                      /></Card.Title>
                      <Card.Title><input
                        type="text"
                        placeholder="Reply to..."
                        value={this.state.replied_to}
                        onChange={this.onChangeReplied_to}
                      /></Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted text-right">{this.state.date}</Card.Subtitle> */}
                      <Card.Text>
                        <textarea
                          className="input-text"
                          placeholder="Write Comment here...."
                          required
                          value={this.state.newItem}
                          onChange={this.onChangeText}
                        ></textarea>
                      </Card.Text>
                      <Button variant="primary" onClick={this.onSubmit}>Comment</Button>
                    </Card.Body>
                  </Card><br />
                  {/*                                   Comment posted                                              */}
                  {this.state.list.map(item => {
                    return (
                      <Media>
                        <Media.Body key={item._id}>
                          <Toast>
                            <Toast.Header>
                              <strong className="mr-auto" style={{ color: "#240e33" }}>Commented by @{item.comment_by}</strong>
                              <strong className="mr-auto" style={{ color: "#240e33" }}>Replied to @{item.replied_to}</strong>
                              <small style={{ color: "#23262e" }}>{this.timeAgo(item.n_date)}</small>
                            </Toast.Header>
                            <Toast.Body style={{ color: "#040c21" }}>{item.newItem}
                            </Toast.Body>
                          </Toast><br />
                        </Media.Body>
                      </Media>
                    )
                  })}

                </Col>
              </Row>
            </Col>
          </Row>
        </Container></div>
    )
  }
}
export default Comment;