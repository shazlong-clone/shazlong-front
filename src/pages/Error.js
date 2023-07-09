import React from 'react';
import notFound from '../assets/images/undraw_page_not_found.svg'
import { Button } from 'rsuite';
import { Link } from 'react-router-dom';
function Error(props) {
    return (
        <div className='text-center'>
            <img className='my-10 max-w-full' alt='not found' src={notFound} />
            <br/>
            <p>404 Error This Page not Found</p>
            <Link to='/'>
                <Button className='my-6' appearance='primary'>Back Home</Button>
            </Link>
        </div>
    );
}

export default Error;