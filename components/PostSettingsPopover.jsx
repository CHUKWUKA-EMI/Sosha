/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { Edit, Delete } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: "auto",
    padding: "0.2em",
  },
  paper: {
    padding: "0.2em",
  },
}));

export default function PostSettingsPopover({
  anchorEl,
  handleClose,
  open,
  handleDelete,
  setToEdit,
  id,
  deleteLoading,
}) {
  const classes = useStyles();
  return (
    <Popover
      id={id}
      className={classes.popover}
      classes={{ paper: classes.paper }}
      open={open}
      anchorEl={anchorEl}
      disablePortal={false}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      disableRestoreFocus
    >
      <Button
        style={{
          backgroundColor: "white",
          width: "100%",
          color: "#32506D",
          fontWeight: "bold",
        }}
        variant="text"
        onClick={setToEdit}
        startIcon={<Edit color="primary" />}
      >
        Edit
      </Button>
      <Divider style={{ backgroundColor: "black" }} />
      <Button
        disabled={deleteLoading}
        style={{
          backgroundColor: "white",
          width: "100%",
          color: "red",
          fontWeight: "bold",
        }}
        onClick={handleDelete}
        variant="text"
        startIcon={<Delete style={{ color: "red" }} />}
      >
        {deleteLoading ? "Deleting..." : "Delete"}
      </Button>
    </Popover>
  );
}
