import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Box, Hidden, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import validations from "../libs/validations";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
// import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "7em",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    fontSize: "bold",
    marginTop: "1em",
  },
  profileInfo: {
    border: "1px solid #32506D",
    padding: "0.3em 1em",
    borderRadius: "5px",
  },
}));

const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const initialMessages = {
    email: "",
    password: "",
    success: "",
    failure: "",
  };

  const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        userId
        token
        tokenExpiration
      }
    }
  `;
  const classes = useStyles();
  // const router = useRouter();
  const [state, setState] = useState(initialState);
  const [messages, setMessages] = useState(initialMessages);
  const [showPassword, setShow] = useState(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const validateField = (e) => {
    if (e.target.name === "email") {
      const validate = validations(state.email, "Email", true, "email");
      if (validate.status) {
        setMessages({
          ...messages,
          email: validate.message,
          success: "",
          failure: "",
        });
      } else {
        setMessages({ ...messages, email: "", success: "", failure: "" });
      }
    }

    if (e.target.name === "password") {
      const validate = validations(state.password, "Password");
      if (validate.status) {
        setMessages({
          ...messages,
          password: validate.message,
          success: "",
          failure: "",
        });
      } else {
        setMessages({ ...messages, password: "", success: "", failure: "" });
      }
    }
  };

  const [login, { loading }] = useMutation(LOGIN, {
    ignoreResults: false,
    onError: (error) => {
      console.log("error", error);
      setMessages({
        ...messages,
        failure: error.graphQLErrors
          ? error?.graphQLErrors[0]?.message
          : "Sorry something went wrong",
      });
    },
    onCompleted: (loginData) => {
      console.log("loginData", loginData);
      document.cookie = "sosha_token=" + loginData.login.token;
      localStorage.setItem("sosha_authData", JSON.stringify(loginData.login));
      clearMessages();
      window.location.href = "/profile";
    },
  });

  const handleSubmit = async () => {
    await login({
      variables: { email: state.email, password: state.password },
    });

    // router.push("/profile");
  };

  const clearError = (value) => {
    if (value !== "success" || value !== "failure") {
      setState({ ...state, [value]: "" });
    }
    setMessages({ ...messages, [value]: "" });
  };

  const clearMessages = () => {
    const timer = setTimeout(() => {
      clearError();
    }, 1000 * 3);

    return () => clearTimeout(timer);
  };

  const noErrors = () => {
    const clean =
      !messages.email && !messages.password && state.email && state.password;

    return !clean;
  };

  return (
    <Grid className={classes.root} spacing={2} justify="center" container>
      <Hidden xsDown>
        <Grid item sm={6}>
          <Box>
            <img src="/auth.svg" alt="auth image" style={{ width: "90%" }} />
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={12} sm={6}>
        <Typography color="primary" component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {messages.failure && (
            <Alert
              severity="error"
              onClose={() => clearError("failure")}
              color="error"
            >
              {messages.failure}
            </Alert>
          )}

          {messages.success && (
            <Alert
              severity="success"
              onClose={() => clearError("success")}
              color="info"
            >
              {messages.success}
            </Alert>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography color="primary">
                Email Address <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                value={state.email}
                onChange={handleChange}
                onKeyUp={validateField}
                disableUnderline={true}
                id="email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            {messages.email && (
              <Alert
                severity="error"
                onClose={() => clearError("email")}
                color="error"
              >
                {messages.email}
              </Alert>
            )}
            <Grid item xs={12}>
              <Typography color="primary">
                Password <span style={{ color: "red" }}>*</span>
              </Typography>
              <Input
                className={classes.profileInfo}
                required
                fullWidth
                disableUnderline={true}
                value={state.password}
                onChange={handleChange}
                onKeyUp={validateField}
                name="password"
                type={!showPassword ? "password" : "text"}
                id="password"
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShow(!showPassword)}
                    >
                      {!showPassword ? (
                        <Visibility color="primary" />
                      ) : (
                        <VisibilityOff color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
            {messages.password && (
              <Alert
                severity="error"
                onClose={() => clearError("password")}
                color="error"
              >
                {messages.password}
              </Alert>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{
              background: noErrors() ? "#cfdce6" : "#32506D",
              border: noErrors() ? "1px solid #cfdce6" : "1px solid #32506D",
              color: noErrors() ? "#fff" : "#fff",
            }}
            disabled={noErrors() || loading ? true : false}
            className={classes.submit}
          >
            {loading ? (
              <CircularProgress size="2em" style={{ color: "#fff" }} />
            ) : (
              "Log In"
            )}
          </Button>
          <Grid style={{ marginTop: "0.5em" }} container justify="flex-end">
            <Grid item>
              <Typography style={{ fontSize: "17px" }}>
                Don`t have an account yet?{" "}
                <Link
                  style={{ fontWeight: "bold", color: "primary" }}
                  href="/signup"
                  variant="body2"
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: "0.5em" }} container justify="center">
            <Grid item>
              <Link
                style={{ color: "primary", fontSize: "17px" }}
                href="/request_reset"
                variant="body2"
              >
                Forgot your password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};
export default Login;
