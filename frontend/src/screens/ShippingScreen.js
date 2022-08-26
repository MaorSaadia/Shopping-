import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/cart">
        Go Back
      </Link>
      <FormContainer>
        <CheckoutSteps step1 />
        <h1> Shipping</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup controlId="address">
            <FormLabel>Address:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <FormGroup controlId="city">
            <FormLabel>City:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter City"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <FormGroup controlId="postalCode">
            <FormLabel>PostalCode:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <FormGroup controlId="country">
            <FormLabel>Country:</FormLabel>
            <FormControl
              type="text"
              placeholder="Enter Country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></FormControl>
          </FormGroup>
          <h5> </h5>
          <div>
            <h2> </h2>
          </div>
          <div className="d-grid gap-3">
            <Button type="submit" variant="primary">
              Continue
            </Button>
          </div>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
