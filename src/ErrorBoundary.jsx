import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // log this to New Relic
    console.error("Error boundary caught an error", error, info);
    setTimeout(() => this.setState({ redirect: true }), 5000);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <div>
          This listing has an error.{" "}
          <Link to="/">Click here to return home.</Link>
        </div>
      );
    }
    return <div>{this.props.children}</div>;
  }
}

export default ErrorBoundary;
