import React from "react";
import { Container } from "@material-ui/core";
import Header from "../components/Header";
import LandingPage from "../components/LandingPage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <React.Fragment>
      <Header />
      <Container maxWidth="xl" disableGutters={true}>
        <LandingPage />
      </Container>
      <Footer />
      <style global jsx>
        {`
          body,
          a,
          label,
          span,
          p,
          h {
            font-family: "Source Sans Pro", sans-serif !important;
          }
        `}
      </style>
    </React.Fragment>
  );
}
