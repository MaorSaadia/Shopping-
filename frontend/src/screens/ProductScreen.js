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
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import Rating from '../component/Rating';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Meta from '../component/Meta';
import {
  listDetailsProducts,
  createProductReview,
} from '../actions/productAction';
import { addToCart } from '../actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const productDeatils = useSelector((state) => state.productDeatils);
  const { loading, error, product } = productDeatils;

  const productReview = useSelector((state) => state.productReview);
  const { success: successProductReview, error: errorProductReview } =
    productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listDetailsProducts(id));
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const addProductToCar = () => {
    dispatch(addToCart(id, qty));
    window.alert('The Product Added To Your Cart');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    );
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
        <>
          <Meta title={product.name} />
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
                <ListGroupItem>
                  Description: {product.description}
                </ListGroupItem>
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
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
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
          <h1> </h1>
          <Row>
            <Col md={8}>
              <h2>Reviews</h2>
              {product.reviews?.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews?.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt?.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroupItem>
                ))}
                <ListGroupItem>
                  <h2>Write a Review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId="rating">
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select A Review</option>
                          <option value="1"> 1 </option>
                          <option value="2"> 2 </option>
                          <option value="3"> 3 </option>
                          <option value="4"> 4 </option>
                          <option value="5"> 5 </option>
                        </FormControl>
                      </FormGroup>
                      <h5> </h5>
                      <FormGroup controlId="comment">
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as="textarea"
                          row="4"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>
                      <h5> </h5>
                      <div className="d-grid gap-3">
                        <Button type="submit" variant="primary">
                          Submit
                        </Button>
                      </div>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Login First</Link> to Write a
                      Review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
