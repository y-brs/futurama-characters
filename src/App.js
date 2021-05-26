import React, { useState } from "react";
import "./index.css";
import "bootswatch/dist/quartz/bootstrap.css";
import { Container, Navbar, Form, Card, Row, Col } from "react-bootstrap";
import Fuse from "fuse.js";
import characters from "./characters.json";

function App() {
  const [query, updateQuery] = useState("");

  const fuse = new Fuse(characters, {
    keys: [
      "name",
      "company",
      "species"
    ],
    includeScore: true
  });

  const results = fuse.search(query);
  const characterResults = query ? results.map(character => character.item) : characters;

  function onSearch({ currentTarget }) {
    updateQuery(currentTarget.value);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="justify-content-center">
        <Navbar.Brand href="/">
          <h1>Futurama Characters</h1>
        </Navbar.Brand>
      </Navbar>

      <Container style={{marginTop: 50}}>
        <Row className="justify-content-center">
          <Col md={4} sm={4}>


              {characterResults.map(character => {
                const { name, company, species, thumb } = character;

                return (
                  <Card className="characters border-primary mb-3">
                    <Card.Img variant="top" src={thumb} />
                    <Card.Body>
                      <Card.Title>{ name }</Card.Title>
                      <Card.Text>
                        { company }<br />
                        { species }
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )
              })}


          </Col>
          <Col md={1} sm={1}></Col>
          <Col md={3} sm={3}>
            <Form>
              <Form.Group className="search">
                <Form.Label><h3>Search</h3></Form.Label>
                <Form.Control type="text" value={query} onChange={onSearch} placeholder="Example, mutant" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
};

export default App;