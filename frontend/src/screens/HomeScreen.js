import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../component/Product';
import Message from '../component/Message';
import Loader from '../component/Loader';
import Meta from '../component/Meta';
import ProductCarousel from '../component/ProductCarousel';
import Paginate from '../component/Paginate';
import { listProducts } from '../actions/productAction';

const HomeScreen = () => {
  const { keyword } = useParams();
  const { pageNumber } = useParams() || 1;

  console.log(pageNumber);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta title={'Shopping+ | Home'} />

      {!keyword ? (
        <>
          <h1 className="Top">Top Rated</h1>
          <ProductCarousel />
          <h1>All Products</h1>
        </>
      ) : (
        <Link to="/" className="btn btn-dark">
          Return
        </Link>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <div class="pagination">
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HomeScreen;
