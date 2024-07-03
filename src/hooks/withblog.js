import { createSearchParams, useNavigate } from 'react-router-dom';
import { RemoveNullKeys } from '../utils/fn';

const withBlog = (WrappedComponent) => {
  return function (props) {
    const navigate = useNavigate();
    const getSearchedBlogs = (p) => {
      navigate({
        search: `?${createSearchParams(RemoveNullKeys(p))}`,
      });
    };

    return <WrappedComponent getSearchedBlogs={getSearchedBlogs} {...props} />;
  };
};

export default withBlog;
