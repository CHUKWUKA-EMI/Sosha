import React from "react";
import MessageComponent from "../components/Messaging";
import Community from "./community";
import Container from "@material-ui/core/Container";

export default function Profile() {
  return (
    <Community>
      <Container maxWidth="md">
        <MessageComponent />
      </Container>
    </Community>
  );
}
