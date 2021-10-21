import { gql } from "@apollo/client";

export const GET_TWEETS = gql`
  query {
    tweets {
      id
      content
      imgUrl
      imagekit_fileId
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
      imagekit_fileId
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
  mutation createTweet(
    $content: String
    $imgUrl: String
    $userId: ID!
    $imagekit_fileId: String
  ) {
    createTweet(
      content: $content
      imgUrl: $imgUrl
      userId: $userId
      imagekit_fileId: $imagekit_fileId
    ) {
      id
      content
      imgUrl
      imagekit_fileId
      createdAt
      User {
        id
        firstName
        lastName
        headline
        imgUrl
      }
    }
  }
`;

export const NEW_TWEET = gql`
  subscription {
    newTweet {
      id
      content
      imgUrl
      imagekit_fileId
      createdAt
      User {
        id
        firstName
        lastName
        headline
        imgUrl
      }
    }
  }
`;
export const DELETE_TWEET_SUBSCRIPTION = gql`
  subscription deleteTweet($id: ID!) {
    deleteTweet(id: $id)
  }
`;

export const UPDATE_TWEET = gql`
  mutation updateTweet(
    $id: ID!
    $content: String
    $imgUrl: String
    $imagekit_fileId: String
  ) {
    updateTweet(
      id: $id
      content: $content
      imgUrl: $imgUrl
      imagekit_fileId: $imagekit_fileId
    ) {
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
      TweetId
      User {
        id
        firstName
        lastName
        headline
        imgUrl
      }
    }
  }
`;

export const COMMENTS_SUBSCRIPTION = gql`
  subscription newComment($TweetId: ID!) {
    newComment(TweetId: $TweetId) {
      id
      comment
      createdAt
      TweetId
      User {
        id
        firstName
        lastName
        headline
        imgUrl
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    user {
      id
      firstName
      lastName
      email
      phone
      imgUrl
      birthdate
      headline
      bio
      country
      state
      website
      isLoggedIn
      user_role
      sex
      createdAt
      Tweets {
        id
        content
        imgUrl
        Comments {
          id
          comment
        }
        Likes {
          id
          UserId
          value
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateProfile(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $phone: String
    $imgUrl: String
    $birthdate: Date
    $headline: String
    $bio: String
    $country: String
    $state: String
    $website: String
    $sex: String
  ) {
    updateProfile(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      imgUrl: $imgUrl
      birthdate: $birthdate
      headline: $headline
      bio: $bio
      country: $country
      state: $state
      website: $website
      sex: $sex
    ) {
      id
      firstName
      lastName
      email
      phone
      headline
      bio
      country
      state
      sex
      website
    }
  }
`;

export const GET_USER_BY_NAME = gql`
  query getUserByName($username: String!, $token: String!) {
    getUserByName(username: $username, token: $token) {
      id
      firstName
      lastName
      email
      phone
      imgUrl
      birthdate
      headline
      bio
      country
      state
      website
      sex
      createdAt
      Tweets {
        id
        content
        imgUrl
      }
      friendship
      requeststatus
    }
  }
`;
export const GET_ALL_USERS = gql`
  query getAllUsers {
    getAllUsers {
      id
      firstName
      lastName
      imgUrl
      headline
      username
      friendship
      blocked
    }
  }
`;

export const ADD_TO_CONNECTIONS = gql`
  mutation addToChatConnections($friendId: ID!) {
    addToChatConnections(friendId: $friendId) {
      id
      requesterId
      friendId
      friendship
    }
  }
`;

export const GET_FRIENDS = gql`
  query {
    friends {
      friend {
        id
        requesterId
        friendId
        friendship
        requeststatus
        blocked
      }
      userId
      firstName
      lastName
      imgUrl
      headline
      username
    }
  }
`;
export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($requesterId: ID!) {
    acceptFriendRequest(requesterId: $requesterId) {
      id
      requesterId
      friendId
      friendship
      requeststatus
      blocked
    }
  }
`;

export const GET_CONNECTED_FRIENDS = gql`
  query {
    connectedFriends {
      friend {
        id
        requesterId
        friendId
        friendship
        requeststatus
        blocked
      }
      userId
      firstName
      lastName
      imgUrl
      headline
      username
      lastMessage
    }
  }
`;
export const CREATE_CHAT = gql`
  mutation createChat(
    $receiverId: ID!
    $friendshipId: ID!
    $receiverName: String
    $message: String!
  ) {
    createChat(
      receiverId: $receiverId
      friendshipId: $friendshipId
      receiverName: $receiverName
      message: $message
    ) {
      _id
      senderId
      senderName
      receiverId
      receiverName
      message
      createdAt
    }
  }
`;
export const GET_CHATS = gql`
  query chats($friendshipId: ID!) {
    chats(friendshipId: $friendshipId) {
      _id
      senderId
      senderName
      receiverId
      receiverName
      friendshipId
      message
      createdAt
    }
  }
`;

export const NEW_MESSAGE = gql`
  subscription newChat($friendshipId: ID!) {
    newChat(friendshipId: $friendshipId) {
      _id
      senderId
      senderName
      receiverId
      receiverName
      friendshipId
      message
      createdAt
    }
  }
`;

export const NEW_LIKE = gql`
  subscription newLike($TweetId: ID!) {
    newLike(TweetId: $TweetId) {
      id
      UserId
      value
      User {
        id
        firstName
        lastName
        imgUrl
        headline
      }
      TweetId
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation like($TweetId: ID!) {
    like(TweetId: $TweetId) {
      id
      UserId
      value
      User {
        id
        firstName
        lastName
        imgUrl
        headline
      }
      TweetId
      createdAt
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlike($TweetId: ID!) {
    unlike(TweetId: $TweetId)
  }
`;
