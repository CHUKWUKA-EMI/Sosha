import React from "react";
import UsersComponent from "../components/UsersComponent";
import Community from "./community";
import Container from "@material-ui/core/Container";

export default function Profile() {
  return (
    <Community>
      <Container maxWidth="md">
        <UsersComponent />
      </Container>
    </Community>
  );
}
