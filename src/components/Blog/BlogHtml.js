import React from 'react';
const parse = require('html-react-parser').default;
function BlogHtml({ blog = {} }) {
  return (
    <div id="content" className="content-with-sidebar-right">
      <div className="blog-single blog-style-large">{parse(blog?.body ?? '')}</div>
    </div>
  );
}

export default BlogHtml;
