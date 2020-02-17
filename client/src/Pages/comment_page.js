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
    title: "",
    date: "Just Now",
    newItem: "",
    list: []
  };

  resetUserInput = () => {
    this.setState({
      parent_id: "",
      title: "",
      date: "Just Now",
      newItem: "",
      list: []
    })
  }

  componentDidMount() {
    axios.get('/forum/comment_page')
      .then(res => {
        var list = [...this.state.list]; //... is spread attribute
        list = res.data;
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

  onSubmit = (e) => {

    const detail = {
      parent_id: this.state.parent_id,
      title: this.state.title,
      newItem: this.state.newItem,
      date: this.timeAgo(new Date()),
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
                  <Card.Subtitle className="mb-2 text-muted text-right">date</Card.Subtitle>
                  <Card.Title style={{ color: "#aabdba" }}>@Author</Card.Title>
                  <Card.Text >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices dui sapien eget mi proin sed. Fermentum leo vel orci porta non pulvinar neque laoreet. Adipiscing enim eu turpis egestas pretium aenean.
                </Card.Text>
                </Card.Body>
              </Card><br />
            </Col>
            <Col>
              <Row>
                <Col>    {/*                                 write a Comment                                             */}
                  <Card className="text-center" style={{ width: '22rem' }}>
                    <Card.Body>
                      <Card.Title><input
                        type="text"
                        placeholder="User Name..."
                        value={this.state.title}
                        onChange={this.onChangeTitle}
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
                        <Media.Body>
                          <Toast>
                            <Toast.Header>
                              <strong className="mr-auto" style={{ color: "#240e33" }}>Commented by @{item.title}</strong>
                              <small style={{ color: "#23262e" }}>{this.timeAgo(item.date)}</small>
                            </Toast.Header>
                            <Toast.Body style={{ color: "#040c21" }}>{item.newItem}
                              <Button variant="link" onClick={1} >reply</Button>
                            </Toast.Body>
                          </Toast><br />
                        </Media.Body>
                      </Media>
                    )
                  })}

                </Col>
              </Row>
              <Row>
              <Col>    {/*                                   Write a Reply                                                */}
                  <Card className="text-center" style={{ width: '19rem' }}>
                  <Card.Body>
                      <Card.Title><input
                        type="text"
                        placeholder="User Name..."
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                      /></Card.Title>
                     
                      {/* <Card.Subtitle className="mb-2 text-muted text-right">{this.state.date}</Card.Subtitle> */}
                      <Card.Text>
                        <textarea
                          className="input-text"
                          placeholder="Reply here...."
                          required
                          value={this.state.newItem}
                          onChange={this.onChangeText}
                        ></textarea>
                      </Card.Text>
                      <Button variant="primary" onClick={this.onSubmit}>Reply</Button>
                    </Card.Body>
                  </Card><br />
                  {/*                                   Reply posted                                              */}
                  {this.state.list.map(item => {
                    return (
                      <Media>
                        <Media.Body>
                          <Toast>
                            <Toast.Header>
                              <strong className="mr-auto" style={{ color: "#240e33" }}>Replied by @{item.title}</strong>
                              <small style={{ color: "#23262e" }}>{this.timeAgo(item.date)}</small>
                            </Toast.Header>
                            <Toast.Body style={{ color: "#040c21" }}>{item.newItem}
                              <Button variant="link" onClick={1} >reply</Button>
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