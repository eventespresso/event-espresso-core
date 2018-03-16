/**
 * External Dependencies
 */
import React from "react";

/**
 * WordPress dependencies
 */
const {registerBlockType} = wp.blocks;

/**
 * Internal Dependencies
 */
import EventListBlock from "./block";

export default () => registerBlockType(
  "ee-shortcodes/events-list",
  {
    title:      "Event Espresso Event List",
    icon:       "list-view",
    category:   "widgets",
    keywords:   ["events", "recent events"],
    supports:   {
      html: false
    },
    transforms: {
      from: [
        {
          type:       "shortcode",
          tag:        "ESPRESSO_EVENTS",
          attributes: {
            title:        {
              type:      "string",
              shortcode: ({named: {title}}) => {
                if (!title) {
                  return;
                }
                return title;
              },
            },
            limit:        {
              type:      "number",
              shortcode: ({named: {limit}}) => {
                if (!limit) {
                  return 10;
                }
                return parseInt(limit, 10);
              },
            },
            cssClass:     {
              type:      "string",
              shortcode: ({named: {css_class}}) => {
                if (!css_class) {
                  return;
                }
                return css_class;
              },
            },
            showExpired:  {
              type:      "boolean",
              shortcode: ({named: {show_expired}}) => {
                switch (show_expired) {
                  case "true":
                  case "1":
                    return true;
                  case "false":
                  case "0":
                    return false;
                  default:
                    return false;
                }
              },
            },
            month:        {
              type:      "string",
              shortcode: ({named: {month}}) => {
                // @todo add some validation here of acceptable month options.
                if (!month) {
                  return;
                }
                return month;
              },
            },
            categorySlug: {
              type:      "string",
              shortcode: ({named: {category_slug}}) => {
                if (!category_slug) {
                  return;
                }
                return category_slug;
              },
            },
            orderBy:      {
              type:      "string",
              shortcode: ({named: {order_by}}) => {
                // @todo add some validation here for valid order_by options.
                if (!order_by) {
                  return;
                }
                return order_by;
              },
            },
            order:        {
              type:      "string",
              shortcode: ({named: {sort}}) => {
                // @todo add some validation here for acceptable order
                // options (ASC/DESC)
                if (!sort) {
                  return;
                }
                return sort;
              },
            },
            showTitle:    {
              type:      "boolean",
              shortcode: ({named: {show_title}}) => {
                switch (show_title) {
                  case "true":
                  case "1":
                    return true;
                  case "false":
                  case "0":
                    return false;
                  default:
                    return false;
                }
              },
            },
          },
        },
      ],
    },
    edit:       EventListBlock,
    save () {
      return null;
    },
  },
);
