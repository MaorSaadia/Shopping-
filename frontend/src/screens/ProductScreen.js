import React from 'react'
//import { useState,useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import {Row,Col,Image,ListGroup,Card,Button,ListGroupItem} from 'react-bootstrap'
import Rating from '../component/Rating'
import products from '../products'

const ProductScreen = () => {
  const {id} = useParams(); 
  const product =products.find((p)=>p._id===id)
  return (
    <>
    <Link className='btn btn-dark my-3' to='/'>
      Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
          <ListGroupItem>
            <h3>{product.name}</h3>
          </ListGroupItem>
          <ListGroupItem>
            <Rating 
            value={product.rating} 
            text={`${product.numReviews} reviews`}/>
          </ListGroupItem>
          <ListGroupItem>
            price: ${product.price}
          </ListGroupItem>
          <ListGroupItem>
            Description: {product.description}
          </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                  <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                  {product.countInStock>0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
              <div class="d-grid gap-2"> 
              <Button variant="outline-info" disabled={product.countInStock===0}>
                  Add To Cart
                </Button>
            </div>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      </>
  )
}

export default ProductScreen