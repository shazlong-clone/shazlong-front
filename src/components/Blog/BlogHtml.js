import React from 'react';

function BlogHtml({ blog = {} }) {
  return (
    <div id="content" className="content-with-sidebar-right">
      <div className="blog-single blog-style-large">{blog?.body ?? ''}</div>
    </div>
  );
}

export default BlogHtml;
