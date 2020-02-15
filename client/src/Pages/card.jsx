import Card from 'react-bootstrap/Card'
import React from 'react';


const Card1=props=>{
    return(
<Card style={{ width: '18rem' }}>
  <Card.Body>
  <Card.Title><input type="text"/></Card.Title>
    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
    <Card.Text>
    <ul>
             
                
                  <li>
                    <div ClassName="p_box">
                    item.value
                    </div>
                    <br/>

                  </li>
                     
            </ul>
    </Card.Text>
    <Card.Link href="#">Card Link</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
    )
}
export default Card1