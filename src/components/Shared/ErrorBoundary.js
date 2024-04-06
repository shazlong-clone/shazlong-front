import React from 'react';
import { Button } from 'rsuite';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
    // eslint-disable-next-line no-console
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1 className="text-center flex justify-center items-center h-[100vh]">
          {localStorage.getItem('i18nextLng') === 'ar' ? (
            <div>
              حدث خطأ ما
              <br /> الرجاء المحاولة لاحقا
              <br />
              <a href="/">
                <Button appearance="primary" size="lg">
                  الرجوع للرئسية
                </Button>
              </a>
            </div>
          ) : (
            <div>
              Something went wrong .
              <br /> Tray Again Later
              <br />
              <a href="/">
                <Button appearance="primary" size="lg">
                  Back Home
                </Button>
              </a>
            </div>
          )}
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
