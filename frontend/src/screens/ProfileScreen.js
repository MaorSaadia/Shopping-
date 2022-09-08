import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  FormLabel,
  FormControl,
  Table,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Meta from '../component/Meta';
import { getUserDetails, UpadateUserProfile } from '../actions/userActions';
import { listMyOrder } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpadateProfile = useSelector((state) => state.userUpadateProfile);
  const { success } = userUpadateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrder());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, userInfo, user, navigate, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage('Passwords Do Not Match');
    } else {
      dispatch(UpadateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <>
      <Meta title={'Shopping+ | Edit'} />
      <Row>
        <Col md={3}>
          <h2>Update Profile</h2>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name">
              <FormLabel>Name:</FormLabel>
              <FormControl
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>
            <FormGroup controlId="email">
              <FormLabel>Email Address:</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <FormGroup controlId="password">
              <FormLabel>Password:</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></FormControl>
            </FormGroup>
            <h5> </h5>

            <FormGroup controlId="confirmPassword">
              <FormLabel>Confirm Password:</FormLabel>
              <FormControl
                type="password"
                placeholder="Confirm Password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></FormControl>
            </FormGroup>

            <div>
              <h2> </h2>
            </div>
            <div className="d-grid gap-3">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={9}>
          <h2> My Orders </h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>{order.totalPrice}$ </td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt?.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDeliverd ? (
                        <i
                          className="fas fa-check"
                          style={{ color: 'Chartreuse' }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-times"
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <div className="d-grid gap-3">
                          <Button className="btn-sm">Details</Button>
                        </div>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
