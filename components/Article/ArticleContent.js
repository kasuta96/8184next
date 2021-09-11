import React from 'react';
import BlocksRender from './BlocksRender';
import PropTypes from 'prop-types';

const ArticleContent = ({ data }) => (
  <section className="my-10">
    <BlocksRender data={data} />

  </section>

)

ArticleContent.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ArticleContent;
