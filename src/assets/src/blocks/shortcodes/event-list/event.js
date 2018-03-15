/**
 * External dependencies
 */
import React from "react";

/**
 * WordPress dependencies
 */
const {decodeEntities} = wp.utils;

export default function Event ({event}) {
  return <a key={"link-" + event.EVT_ID} href={event.link} target="_blank">{decodeEntities(event.EVT_name.trim()) ||
  "Untitled"}</a>;
}
