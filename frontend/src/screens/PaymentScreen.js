import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Col,
  FormGroup,
  FormLabel,
  FormCheck,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../component/FormContainer';
import CheckoutSteps from '../component/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/cart">
        Go Back
      </Link>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1> Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <FormGroup>
            <FormLabel as="legend"> Select Method</FormLabel>
            <Col>
              <FormCheck
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormCheck>
              {/* <FormCheck
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></FormCheck> */}
            </Col>
          </FormGroup>
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

export default PaymentScreen;
