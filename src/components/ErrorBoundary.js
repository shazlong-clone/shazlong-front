import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'rsuite';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1 className='text-center flex justify-center items-center h-[100vh]'>
          <div>
            Something went wrong.
            <br /> Tray Again Later
            <br />
            <a href='/'>
              <Button appearance='primary' >Back Home</Button>
            </a>
          </div>
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
