import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Jumbotron fluid>
      <Container>
        <h1>Welcome to AI Education Platform</h1>
        <p>
          Learn about artificial intelligence with our comprehensive courses and resources.
        </p>
      </Container>
    </Jumbotron>
  );
};

export default Home;