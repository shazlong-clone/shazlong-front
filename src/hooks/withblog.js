import { useState } from 'react';
import useSubmition from './useSubmit';
import { getBlogs } from '../features/blog/blogAction';

const withBlog = (WrappedComponent) => {
  return function (props) {
    const { params } = props;
    const submit = useSubmition();
    const [searchedBlogs, setSearchedBlogs] = useState([]);
    const [err, setError] = useState(false);
    const getSearchedBlogs = () => {
      submit(getBlogs, params, { showLoader: true, showToast: true })
        .then((res) => {
          setSearchedBlogs(res?.payload?.result?.data);
        })
        .catch(() => {
          setError(true);
        });
    };

    return (
      <WrappedComponent
        searchedBlogs={searchedBlogs}
        setSearchedBlogs={setSearchedBlogs}
        err={err}
        getSearchedBlogs={getSearchedBlogs}
        {...props}
      />
    );
  };
};

export default withBlog;
