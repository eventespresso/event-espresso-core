/**
 * A block for inspector controls that allows for the following settings related to queries:
 * - category (espresso_events category)
 * - order
 * - orderby
 */
/**
 * External Dependencies
 */
import { noop } from "lodash";
import React from "react";

/**
 * WordPress dependencies
 **/
const {RangeControl, SelectControl} = wp.components;

/**
 * Internal dependencies
 **/
import EventCategorySelect from "./event-category-select";

const DEFAULT_MIN_ITEMS = 1;
const DEFAULT_MAX_ITEMS = 100;

export default function QueryPanel ({
    category,
    limit = 10,
    order,
    orderBy,
    maxItems = DEFAULT_MAX_ITEMS,
    minItems = DEFAULT_MIN_ITEMS,
    onCategoryChange,
    onLimitChange,
    onOrderChange = noop,
    onOrderByChange = noop,
  }) {
  return [
    (onOrderChange || onOrderByChange) && (
      <SelectControl
        key="event-list-query-panel-select"
        label={"Order by"}
        value={`${ orderBy }/${ order }`}
        options={[
          {
            label: "Event Start Date Newest to Oldest",
            value: "start_date/DESC",
          },
          {
            label: "Event Start Date Oldest to Newest",
            value: "start_date/ASC",
          },
          {
            label: "Ticket Start Date Newest to Oldest",
            value: "ticket_start/DESC",
          },
          {
            label: "Ticket Start Date Oldest to Newest",
            value: "ticket_start/ASC",
          },
          {
            label: "Ticket End Date Newest to Oldest",
            value: "ticket_end/DESC",
          },
          {
            label: "Ticket End Date Oldest to Newest",
            value: "ticket_end/ASC",
          },
          {
            label: "Venue Title Descending",
            value: "venue_title/DESC",
          },
          {
            label: "Venue Title Ascending",
            value: "venue_title/ASC",
          },
          {
            label: "City Descending",
            value: "city/DESC",
          },
          {
            label: "City Ascending",
            value: "city/ASC",
          },
          {
            label: "State Descending",
            value: "state/DESC",
          },
          {
            label: "State Ascending",
            value: "state/ASC",
          },
        ]}
        onChange={
          (value) => {
            const [newOrderBy, newOrder] = value.split("/");
            if (newOrder !== order) {
              onOrderChange(newOrder);
            }
            if (newOrderBy !== orderBy) {
              onOrderByChange(newOrderBy);
            }
          }
        }
      />
    ),
    onCategoryChange && (
      <EventCategorySelect
        key="event-list-query-panel-category-select"
        label={"Event Category"}
        noOptionLabel={"All"}
        selectedCategory={category}
        onChange={onCategoryChange}
      />
    ),
    onLimitChange && (
      <RangeControl
        key="event-list-range-control"
        label={"Number of Events"}
        value={limit}
        onChange={onLimitChange}
        min={minItems}
        max={maxItems}
      />
    ),
  ];
}
