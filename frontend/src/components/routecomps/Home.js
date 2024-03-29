import React, { useState } from "react"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import reviewService from '../../services/reviews'
import BookList from '../BookList'
import useMatch from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Home = ({results, submitQuery, handleChange}) => {

  return (
    <Container>
      <Form>
        <Form.Group className="book-search" controlId="formSearch">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a work, author, or subject"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={submitQuery}>
          Submit
        </Button>
      </Form>

      <BookList books={results} />
    </Container>

  )
}

export default Home