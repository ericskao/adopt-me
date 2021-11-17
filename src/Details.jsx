import { Component } from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import ThemeContext from "./ThemeContext.jsx";
import Modal from "./Modal.jsx"

class Details extends Component {
  state = { loading: true, showModal: false };

  async componentDidMount() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
    );
    const json = await res.json();
    this.setState(
      Object.assign(
        {
          loading: false,
        },
        json.pets[0]
      )
    );
  }

  toggleModal = () => {
    this.setState({showModal: !this.state.showModal})
  }

  adopt = () => {
    window.location = 'http://bit.ly/pet-adopt'
  }

  render() {
    const { animal, breed, city, state, description, name, images } =
      this.state;
    if (this.state.loading) {
      return "Loading...";
    }
    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <Carousel images={images} />
          <h2>{`${animal} — ${breed} — ${city}, ${state}`}</h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{backgroundColor: theme}} onClick={this.toggleModal}>Adopt {name}</button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {this.state.showModal ? (<Modal>
            <div>
              <h1>Would you like to adopt {name}</h1>
              <div className='buttons'>
              <ThemeContext.Consumer>
                {([theme]) => (
                  <button style={{backgroundColor: theme}} onClick={this.adopt}>Yes</button>
                )}
                </ThemeContext.Consumer>
                <button onClick={this.toggleModal}>No</button>
              </div>
            </div>
          </Modal>) : null}
        </div>
      </div>
    );
  }
}

const DetailsWithRouter = withRouter(Details);

export default function DetailsWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <DetailsWithRouter />
    </ErrorBoundary>
  );
}
