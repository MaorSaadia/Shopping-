import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Paginate from '../component/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

const ProductListScreen = () => {
  const { pageNumber } = useParams() || 1;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo.isAdmin) {
      navigate('/login');
    }
    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm(`Are You Sure You Want to Delete`)) {
      dispatch(deleteProduct(id));
    }
  };

  const createProducHandler = () => {
    dispatch(createProduct());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>PRODUCTS</h1>
        </Col>
        <Col className="text-right"></Col>
        <Button className="my-3" onClick={createProducHandler}>
          <i className="fas fa-plus"></i> Create Product
        </Button>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}$</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    {' '}
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button clsssname="btn-sm" variant="dark">
                        <i
                          className="fas fa-edit"
                          style={{ color: 'LightSteelBlue' }}
                        ></i>
                      </Button>
                    </LinkContainer>{' '}
                  </td>
                  <td>
                    {' '}
                    <Button
                      className="btn-sm"
                      variant="dark"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i
                        className="fas fa-trash"
                        style={{ color: 'Tomato' }}
                      ></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListScreen;
