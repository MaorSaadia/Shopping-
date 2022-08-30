import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from 'react-bootstrap';
import Message from '../component/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();

  const qty = search ? Number(search.split('=')[1]) : 1;

  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login');
    } else {
      navigate('/shipping');
    }
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // const checkoutHandler = () => {
  //   console.log('checkout');
  //   navigate('/login?redirect=shipping');
  //   //history.push('/login?redirect=shipping')
  // };

  // const checkoutHandler = () => {
  //   if (!userInfo) {
  //     navigate('/login?redirect=shipping');
  //   } else {
  //     navigate('/cart?redirect=shipping');
  //   }
  // };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back </Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      size="sm"
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="dark"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash" style={{ color: 'red' }}></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
            <Link className="btn btn-dark my-1" to="/">
              Go Back
            </Link>
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <h1> </h1>
        <h3> </h3>
        <Card>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              Total Price:{' '}
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
              $
            </ListGroupItem>
            <ListGroupItem>
              <div className="d-grid gap-3">
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
