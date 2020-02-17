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

class Comment extends React.Component {
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
        </Navbar>
        <Container>

          <Row>
            <Col>
              <Card style={{ width: '19rem' }}>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted text-right">date</Card.Subtitle>
                  <Card.Title style={{ color: "green" }}>@Author</Card.Title>
                  <Card.Text style={{ color: "black" }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices dui sapien eget mi proin sed. Fermentum leo vel orci porta non pulvinar neque laoreet. Adipiscing enim eu turpis egestas pretium aenean.
                </Card.Text>
                </Card.Body>
              </Card><br />
            </Col>
            <Col>
              <Row>
                <Col>
                  <Card className="text-center" style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><input
                        type="text"
                        placeholder="User Name..."
                        value=""
                        onChange={1}
                      /></Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted text-right">{this.state.date}</Card.Subtitle> */}
                      <Card.Text>
                        <textarea
                          className="input-text"
                          placeholder="Comment here...."
                          required
                          value=""
                          onChange={1}
                        ></textarea>
                      </Card.Text>
                      <Button variant="primary" onClick={1}>Comment</Button>
                    </Card.Body>
                  </Card><br />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Media>
                    <Media.Body>
                      <Toast>
                        <Toast.Header>
                          <strong className="mr-auto">Bootstrap</strong>
                          <small>11 mins ago</small>
                        </Toast.Header>
                        <Toast.Body>Hello, world! This is a toast message.
                      <Button variant="link" onClick={1}>reply</Button>
                        </Toast.Body>
                      </Toast><br/>
                      <Media>
                        <h5 style={{ color: "transparent" }}>Reply</h5>
                        <Media.Body>
                          <Toast>
                            <Toast.Header>
                              <strong className="mr-auto">Bootstrap</strong>
                              <small>11 mins ago</small>
                            </Toast.Header>
                            <Toast.Body>Hello, world! This is a toast message.
                          <Button variant="link" onClick={1}>reply</Button></Toast.Body>
                          </Toast><br/>
                        </Media.Body>
                      </Media>
                      <Media>
                        <h5 style={{ color: "transparent" }}>Reply</h5>
                        <Media.Body>
                          <Toast>
                            <Toast.Header>
                              <strong className="mr-auto">Bootstrap</strong>
                              <small>11 mins ago</small>
                            </Toast.Header>
                            <Toast.Body>Hello, world! This is a toast message.
                          <Button variant="link" onClick={1}>reply</Button></Toast.Body>
                          </Toast>
                        </Media.Body>
                      </Media>
                    </Media.Body>
                  </Media>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container></div>
    )
  }
}
export default Comment;


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

//   render() {
//     return (
//       <div className="body" style={{ backgroundColor: "#174527" }}>
//         <Navbar bg="dark" variant="dark">
//           <Navbar.Brand href="https://www.edgistify.com">Edgistify</Navbar.Brand>
//           <Nav className="mr-auto">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/signup">Register</Nav.Link>
//             <Nav.Link href="/login">Login</Nav.Link>
//           </Nav>
//           <Nav>
//             <h3><Badge variant="secondary">COMMENT SECTION</Badge></h3>
//           </Nav>
//         </Navbar>
//         <Container>

//           <Row>
//             <Col>    {/*                                   post                                              */}
//               <Card className="text-white bg-dark mb-3" style={{ width: '19rem' }}>
//                 <Card.Body>
//                   <Card.Subtitle className="mb-2 text-muted text-right">date</Card.Subtitle>
//                   <Card.Title style={{ color: "#aabdba" }}>@Author</Card.Title>
//                   <Card.Text >
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices dui sapien eget mi proin sed. Fermentum leo vel orci porta non pulvinar neque laoreet. Adipiscing enim eu turpis egestas pretium aenean.
//                 </Card.Text>
//                 </Card.Body>
//               </Card><br />
//             </Col>
//             <Col>
//               <Row>
//                 <Col>    {/*                                   Comment                                              */}
//                   <Card className="text-center" style={{ width: '20rem' }}>
//                     <Card.Body>
//                       <Card.Title><input
//                         type="text"
//                         placeholder="User Name..."
//                         value={this.state.title}
//                         onChange={this.onChangeTitle}
//                       /></Card.Title>
//                       {/* <Card.Subtitle className="mb-2 text-muted text-right">{this.state.date}</Card.Subtitle> */}
//                       <Card.Text>
//                         <textarea
//                           className="input-text"
//                           placeholder="Comment here...."
//                           required
//                           value={this.state.newItem}
//                           onChange={this.onChangeText}
//                         ></textarea>
//                       </Card.Text>
//                       <Button variant="primary" onClick={this.onSubmit}>Comment</Button>
//                     </Card.Body>
//                   </Card><br />
//                   {/*                                   Comment posted                                              */}
//                   {this.state.list.map(item => {
//                     return (
//                       <div >
//                         <Card style={{ width: '20rem' }}>
//                           <Card.Body key={item.title}>
//                             <Card.Subtitle className="mb-2 text-muted text-right">{this.timeAgo(item.date)}</Card.Subtitle>
//                             <Card.Title style={{ fontWeight: "900" }, { textTransform: "uppercase" }, { color: "#0377fc" }}>Author: @{item.title}</Card.Title>

//                             <Card.Text style={{ color: "#232e29" }}> {item.newItem} </Card.Text>
//                             <Card.Link href="#" style={{ color: "#081940" }, { fontWeight: "700" }}>Comment</Card.Link>
//                           </Card.Body>
//                         </Card><br />
//                       </div>
//                     )
//                   })}

//                 </Col>
//               </Row>
//               <Row>
//                 <Col>  {/*                                   Reply                                              */}
//                   {
//                     <Media>
//                       <Media.Body>
//                         <Toast>
//                           <Toast.Header>
//                             <strong className="mr-auto">Author: @{item.title}</strong>
//                             <small>{this.timeAgo(item.date)}</small>
//                           </Toast.Header>
//                           <Toast.Body>{item.newItem}
//                       <Button variant="link" onClick={1}>reply</Button>
//                           </Toast.Body>
//                         </Toast><br />
//                         <Media>           {/*                                   Reply to Reply                                             */}
//                           <h5 style={{ color: "transparent" }}>Reply</h5>
//                           <Media.Body>
//                             <Toast>
//                               <Toast.Header>
//                                 <strong className="mr-auto">Bootstrap</strong>
//                                 <small>11 mins ago</small>
//                               </Toast.Header>
//                               <Toast.Body>Hello, world! This is a toast message.
//                           <Button variant="link" onClick={1}>reply</Button></Toast.Body>
//                             </Toast><br />
//                           </Media.Body>
//                         </Media>
//                       </Media.Body>
//                     </Media>
//                   }
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </Container></div>
//     )
//   }
// }
// export default Comment;