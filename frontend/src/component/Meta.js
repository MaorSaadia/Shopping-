import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keyword }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
      <meta name="keyword" content={description}></meta>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Shopping+',
  description: 'Here you buy electronics and more..',
  keyword: 'electronics,buy electronics',
};

export default Meta;