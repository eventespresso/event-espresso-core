/**
 * External dependencies
 */
import React from "react";
import { stringify } from "querystringify";
import moment from "moment";
import { classnames } from "classnames";
import { isUndefined, pickBy, map, merge } from "lodash";

/**
 * WordPress dependencies
 */
const {Component}         = wp.element;
const {
        Placeholder,
        Spinner,
        withAPIData,
        ToggleControl,
        TextControl,
        SelectControl,
      }                   = wp.components;
const {InspectorControls} = wp.blocks;
const nowDateAndTime      = moment();

/**
 * Internal dependencies
 */
import QueryPanel from "../../query-panel";
import Event from "./event";

class EventsListBlock extends Component {
  constructor () {
    super(...arguments);
  }

  toggleShowExpired () {
    const {showExpired}   = this.props.attributes;
    const {setAttributes} = this.props;
    setAttributes({showExpired: !showExpired});
  }

  toggleShowTitle () {
    const {showTitle}     = this.props.attributes;
    const {setAttributes} = this.props;
    setAttributes({showTitle: !showTitle});
  }

  render () {
    const latestEvents                                                                          = this.props.latestEvents.data;
    const {attributes, setAttributes, isSelected}                                               = this.props;
    const {showExpired, title, limit, cssClass, month, categorySlug, orderBy, order, showTitle} = attributes;
    const inspectorControls                                                                     = isSelected && (
      <InspectorControls key="inspector-event-list">
        <h3>{"Latest Events Settings"}</h3>
        <QueryPanel
          {...{order, orderBy}}
          limit={limit}
          category={categorySlug}
          onOrderChange={(value) => setAttributes({order: value})}
          onOrderByChange={(value) => setAttributes({orderBy: value})}
          onCategoryChange={(value) => setAttributes({categorySlug: "" !== value ? value : undefined})}
          onLimitChange={(value) => setAttributes({limit: value})}
        />
        <ToggleControl
          label={"Show Expired Events"}
          checked={showExpired}
          onChange={() => this.toggleShowExpired()}
        />
        <ToggleControl
          label={"Show Title"}
          checked={showTitle}
          onChange={() => this.toggleShowTitle()}
        />
        <TextControl
          label={"Label for Latest Events"}
          value={title}
          onChange={(value) => setAttributes({title: value})}
        />
        <TextControl
          label={"CSS class for Latest Events container"}
          value={cssClass}
          onChange={(value) => setAttributes({cssClass: value})}
        />
        <SelectControl
          label={"Month to return events for (this year):"}
          value={month}
          options={[
            {
              label: "None",
              value: "none",
            },
            {
              label: "January",
              value: "January",
            },
            {
              label: "February",
              value: "February",
            },
            {
              label: "March",
              value: "March",
            },
            {
              label: "April",
              value: "April",
            },
            {
              label: "May",
              value: "May",
            },
            {
              label: "June",
              value: "June",
            },
            {
              label: "July",
              value: "July",
            },
            {
              label: "August",
              value: "August",
            },
            {
              label: "September",
              value: "September",
            },
            {
              label: "October",
              value: "October",
            },
            {
              label: "November",
              value: "November",
            },
            {
              label: "December",
              value: "December",
            },
          ]}
          onChange={(value) => setAttributes({month: value})}
        />
      </InspectorControls>
    );
    const hasEvents                                                                             = Array.isArray(
      latestEvents) && latestEvents.length;
    if (!hasEvents) {
      return [
        inspectorControls,
        <Placeholder key="placeholder"
                     icon="admin-post"
                     label={"Events List"}
        >
          {!Array.isArray(latestEvents)
            ? <Spinner/>
            : "No events found."
          }
        </Placeholder>,
      ];
    }

    const displayEvents = latestEvents.length > limit
      ? latestEvents.slice(0, limit)
      : latestEvents;

    const listTitle = showTitle && title ? <h3 key='list-title-label'>{title}</h3> : "";

    return [
      inspectorControls,
      <div key='eea-event-list-block'>
        {listTitle}
        <p key='event-list-paragraph-info'>
          {"Note this is just a sample preview, it's not actually what gets output in the front.  When we implement this block more fully, we'll want to mirror what appears on the frontend"}
        </p>
        <ul
          className={this.props.className}
          key="event-list"
        >
          {displayEvents.map((event, i) =>
            <li key={i}>
              <Event
                key={event.EVT_ID}
                event={event}
              />
            </li>,
          )}
        </ul>
      </div>,
    ];
  }
}

const mapOrderBy = (orderBy) => {
  switch (orderBy) {
    case "start_date":
      return "Datetime.DTT_EVT_start";
    case "ticket_start":
      return "Datetime.Ticket.TKT_start_date";
    case "ticket_end":
      return "Datetime.Ticket.TKT_end_date";
    case "venue_title":
      return "Venue.VNU_name";
    case "city":
      return "Venue.VNU_city";
    case "state":
      return "Venue.State.STA_name";
    default:
      return orderBy;
  }
};

const whereConditions = ({showExpired, categorySlug, month}) => {
  let where               = [];
  const GREATER_AND_EQUAL = encodeURIComponent(">=");
  const LESS_AND_EQUAL    = encodeURIComponent("<=");
  //using .replace('Z', '') on the end of our moment strings because EE currently has a bug with parsing default
  //moment formatted strings (@see https://events.codebasehq.com/projects/event-espresso/tickets/11368)
  if (!showExpired) {
    where.push("where[Datetime.DTT_EVT_end**expired][]=>&where[Datetime.DTT_EVT_end**expired][]="
      + nowDateAndTime.local().format());
  }
  if (categorySlug) {
    where.push("where[Term_Relationship.Term_Taxonomy.Term.slug]=" + categorySlug);
  }
  if (month && month !== "none") {
    where.push("where[Datetime.DTT_EVT_start][]=" + GREATER_AND_EQUAL + "&where[Datetime.DTT_EVT_start][]="
      + moment().month(month).startOf("month").local().format());
    where.push("where[Datetime.DTT_EVT_end][]=" + LESS_AND_EQUAL + "&where[Datetime.DTT_EVT_end][]="
      + moment().month(month).endOf("month").local().format());
  }
  return where.join("&");
};

export default withAPIData((props) => {
  const {limit, order, orderBy} = props.attributes;
  const where                   = whereConditions(props.attributes);
  const queryArgs               = {
    limit,
    order,
    "order_by": mapOrderBy(orderBy),
  };

  let queryString = stringify(pickBy(queryArgs, value => !isUndefined(value)));

  if (where) {
    queryString += "&" + where;
  }

  return {
    latestEvents: `/ee/v4.8.36/events?${ queryString }`,
  };
})(EventsListBlock);
