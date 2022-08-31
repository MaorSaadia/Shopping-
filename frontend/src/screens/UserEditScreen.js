import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import FormContainer from '../component/FormContainer';
import { getUserDetails } from '../actions/userActions';

const UserEditScreen = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, user, id]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-dark my-3">
        Go Back
      </Link>

      <FormContainer>
        <div>
          <h1> </h1>
          <h1> </h1>
        </div>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
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

            <FormGroup controlId="isadmin">
              <FormCheck
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></FormCheck>
            </FormGroup>
            <h5> </h5>

            <div className="d-grid gap-3">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
