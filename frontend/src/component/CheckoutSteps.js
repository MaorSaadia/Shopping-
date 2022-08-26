import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4">
      <NavItem>
        {step1 ? (
          <Nav.Link as={Link} to="/login" className="active-link">
            Sign In
          </Nav.Link>
        ) : (
          <Nav.Link disabled to="/login" className="disabled-link">
            Sign In
          </Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step2 ? (
          <Nav.Link as={Link} to="/shipping" className="active-link">
            Shipping
          </Nav.Link>
        ) : (
          <Nav.Link disabled to="/shipping" className="disabled-link">
            Shipping
          </Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step3 ? (
          <Nav.Link as={Link} to="/payment" className="active-link">
            Payment
          </Nav.Link>
        ) : (
          <Nav.Link disabled to="/payment" className="disabled-link">
            Payment
          </Nav.Link>
        )}
      </NavItem>

      <NavItem>
        {step4 ? (
          <Nav.Link as={Link} to="/placeorder" className="active-link">
            Place Order
          </Nav.Link>
        ) : (
          <Nav.Link disabled to="/placeorder" className="disabled-link">
            Place Order
          </Nav.Link>
        )}
      </NavItem>
    </Nav>
  );
};

export default CheckoutSteps;
