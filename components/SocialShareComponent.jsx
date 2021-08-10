/* eslint-disable react/prop-types */
import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
  socialMediaPopper: {
    display: "grid",
  },
  socialMediaButton: {
    marginLeft: "5px",
  },
  paper: {
    border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "1px",
  },
}));

// eslint-disable-next-line react/prop-types
const ShareComponent = ({ article, anchorEl, openPopper }) => {
  const classes = useStyles();
  return (
    <Popper
      className={classes.socialMediaPopper}
      anchorEl={anchorEl}
      open={openPopper}
      transition
    >
      <div className={classes.paper}>
        <FacebookShareButton
          className={classes.socialMediaButton}
          url={`https://sosha.vercel.app/feed/${article.id}`}
          // eslint-disable-next-line react/prop-types
          quote={article.content}
          hashtag="#studysey"
        >
          <FacebookIcon size={36} />
        </FacebookShareButton>
        <TwitterShareButton
          className={classes.socialMediaButton}
          url={`https://sosha.vercel.app/feed/${article.id}`}
          title={article.content}
          hashtag="#studysey"
        >
          <TwitterIcon size={36} />
        </TwitterShareButton>
        <LinkedinShareButton
          className={classes.socialMediaButton}
          url={`https://sosha.vercel.app/feed/${article.id}`}
          title={article.content}
          hashtag="#studysey"
        >
          <LinkedinIcon size={36} />
        </LinkedinShareButton>
        <WhatsappShareButton
          className={classes.socialMediaButton}
          url={`https://sosha.vercel.app/feed/${article.id}`}
          title={article.content}
          separator=":: "
        >
          <WhatsappIcon size={36} />
        </WhatsappShareButton>
      </div>
    </Popper>
  );
};

export default ShareComponent;
