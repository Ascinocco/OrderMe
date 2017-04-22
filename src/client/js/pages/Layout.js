import React from "react";
import { Container } from "reactstrap"

import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

require('../../sass/all.scss');
export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <div>
        <Navigation location={location} />
        <Container fluid>
          {this.props.children}
        </Container>
        <Footer />
      </div>
    );
  }
}
