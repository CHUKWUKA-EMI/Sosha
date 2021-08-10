/* eslint-disable react/prop-types */
import React from "react";
import Head from "next/head";

export default function HelmetMetaData(props) {
  let currentUrl = "https://sosha.vercel.app/feed";
  let quote = props.quote !== undefined ? props.quote : "";
  let title =
    props.title !== undefined ? props.title : "Post from Sosha's feeds";
  let image =
    props.image !== undefined
      ? props.image
      : "https://storage.googleapis.com/cmperstribe_storage_usha/Banner/IMG_3640.JPG";
  let description =
    props.description !== undefined
      ? props.description
      : "Sosha is a social media platform and a community for professionals. We post and share rich, eductive and inspiring articles daily. We make collaboration and peer-to-peer engagement easy.";
  let hashtag = props.hashtag !== undefined ? props.hashtag : "#sosha";
  return (
    <Head>
      <title>{`${title}`}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="csrf_token" content="" />
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="_token" content="" />
      <meta name="robots" content="noodp" />
      <meta property="title" content={`${title}`} key="title" />
      <meta property="quote" content={quote} key="quote" />
      <meta name="description" content={description} key="desc" />
      <meta property="image" content={`${image}`} key="image" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title}`} key="ogtitle" />
      <meta property="og:quote" content={`${quote}`} key="ogquote" />
      <meta property="og:hashtag" content={`${hashtag}`} />
      <meta property="og:image" content={`${image}`} key="ogimage" />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={`${currentUrl}`} key="ogurl" />
      <meta property="og:site_name" content="studysey" key="ogsite_name" />
      <meta property="og:description" content={`${description}`} key="ogdesc" />
    </Head>
  );
}
