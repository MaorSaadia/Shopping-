import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from 'react-bootstrap';
import Rating from '../component/Rating';
import Message from '../component/Message';
import Loader from '../component/Loader';
import { listDetailsProducts } from '../actions/productAction';
import { addToCart } from '../actions/cartActions';

const ProductScreen = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const productDeatils = useSelector((state) => state.productDeatils);
  const { loading, error, product } = productDeatils;

  useEffect(() => {
    dispatch(listDetailsProducts(id));
  }, [dispatch, id, navigate]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addProductToCar = () => {
    dispatch(addToCart(id, qty));
    window.alert('The Product Added To Your Cart');
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>price: ${product.price}</ListGroupItem>
              <ListGroupItem>Description: {product.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
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
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <Row>
                      <Col>Qty:</Col>
                      <Col>
                        <Form.Control
                          size="sm"
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroupItem>
                )}

                <ListGroupItem>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={addProductToCar}
                      variant="outline-info"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </ListGroupItem>

                <ListGroupItem>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={addToCartHandler}
                      variant="outline-info"
                      disabled={product.countInStock === 0}
                    >
                      Go To Cart
                    </Button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
