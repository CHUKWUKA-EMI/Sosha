import { gql } from "@apollo/client";

export const GET_TWEETS = gql`
  query {
    tweets {
      id
      content
      imgUrl
      createdAt
      User {
        id
        firstName
        lastName
        email
        imgUrl
      }
      Comments {
        id
        comment
        createdAt
        User {
          id
          firstName
          lastName
          imgUrl
        }
      }
      Likes {
        id
        value
        UserId
      }
    }
  }
`;

export const GET_SINGLE_TWEET = gql`
  query tweet($TweetId: ID!) {
    tweet(TweetId: $TweetId) {
      id
      content
      imgUrl
      createdAt
      User {
        id
        firstName
        lastName
        email
        imgUrl
        headline
      }
      Comments {
        id
        comment
        createdAt
        User {
          id
          firstName
          lastName
          imgUrl
        }
      }
      Likes {
        id
        value
        UserId
      }
    }
  }
`;

export const GET_TWEET_COMMENTS = gql`
  query tweetComments($TweetId: ID!) {
    tweetComments(TweetId: $TweetId) {
      id
      comment
      createdAt
      User {
        firstName
        lastName
        imgUrl
        headline
      }
    }
  }
`;

export const CREATE_TWEET = gql`
  mutation createTweet($content: String, $imgUrl: String) {
    createTweet(content: $content, imgUrl: $imgUrl) {
      id
      content
      imgUrl
    }
  }
`;

export const UPDATE_TWEET = gql`
  mutation updateTweet($id: ID!, $content: String, $imgUrl: String) {
    updateTweet(id: $id, content: $content, imgUrl: $imgUrl) {
      id
      content
      imgUrl
    }
  }
`;

export const DELETE_TWEET = gql`
  mutation deleteTweet($id: ID!) {
    deleteTweet(id: $id)
  }
`;

export const ADD_COMMENT = gql`
  mutation createComment($TweetId: ID!, $comment: String) {
    createComment(TweetId: $TweetId, comment: $comment) {
      id
      comment
      createdAt
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription newComment($TweetId: ID!) {
    newComment(TweetId: $TweetId) {
      id
      comment
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation like($TweetId: ID!) {
    like(TweetId: $TweetId)
  }
`;
