import React, { useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../component/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = () => {
  const { productId } = useParams();
  const { loaction } = useLocation;

  const qty = loaction ? Number(loaction.split('=')[0]) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) dispatch(addToCart(productId, qty));
  }, [dispatch, productId, qty]);

  return <div>Cart</div>;
};

export default CartScreen;
