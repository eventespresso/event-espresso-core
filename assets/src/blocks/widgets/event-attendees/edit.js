/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { PanelBody, Placeholder, Spinner, ToggleControl } from '@wordpress/components';

/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';
import {
	EditorDatetimeSelect,
	EditorEventSelect,
	EditorStatusSelect,
	EditorTicketSelect,
	QueryLimit,
} from '@eventespresso/components';
import * as statusModel from '../../../data/model/status';
import PropTypes from 'prop-types';
import { isEmpty, uniqBy } from 'lodash';

/**
 * Internal dependencies
 */
import { EventAttendeesList } from './list';

class EventAttendeesEditor extends Component {
	static propTypes = {
		attendees: PropTypes.array,
		isLoading: PropTypes.bool,
		attributes: PropTypes.shape( {
			eventId: PropTypes.number,
			datetimeId: PropTypes.number,
			ticketId: PropTypes.number,
			status: PropTypes.string,
			showGravatar: PropTypes.bool,
			displayOnArchives: PropTypes.bool,
			limit: PropTypes.number,
		} ),
	};

	static defaultProps = {
		attendees: [],
		isLoading: true,
		attributes: {
			eventId: 0,
			datetimeId: 0,
			ticketId: 0,
			status: 'RAP',
			showGravatar: true,
			displayOnArchives: false,
			limit: -1
		},
	};

	setEventId = ( eventId ) => {
		const value = eventId !== null && eventId.value ?
			parseInt( eventId.value, 10 ) :
			0;
		this.props.setAttributes(
			{
				eventId: value,
				datetimeId: 0,
				ticketId: 0,
			}
		);
	};

	setDatetimeId = ( datetimeId ) => {
		const value = datetimeId !== null && datetimeId.value ?
			parseInt( datetimeId.value, 10 ) :
			0;
		this.props.setAttributes(
			{
				datetimeId: value,
				ticketId: 0,
			}
		);
	};

	setTicketId = ( ticketId ) => {
		const value = ticketId !== null && ticketId.value ?
			parseInt( ticketId.value, 10 ) :
			0;
		this.props.setAttributes( { ticketId: value } );
	};

	setStatus = ( status ) => {
		const value = status !== null && status.value ? status.value : 'ANY';
		console.log( 'status: ' + value );
		this.props.setAttributes( { status: value } );
		console.log( 'this.props.attributes.status: ' + this.props.attributes.status );
	};

	setLimit = ( limit ) => {
		this.props.setAttributes( {
			limit: parseInt( limit, 10 )
		} );
	};

	toggleShowGravatar = ( showGravatar ) => {
		this.props.setAttributes( { showGravatar: showGravatar } );
	};

	toggleDisplayOnArchives = ( displayOnArchives ) => {
		this.props.setAttributes( { displayOnArchives: displayOnArchives } );
	};

	getPlaceHolderContent() {
		if ( ! this.props.isLoading && this.props.attributes.eventId ) {
			return (
				<p> { __( 'No attendees... yet!', 'event_espresso' ) } </p>
			);
		}
		if ( ! this.props.isLoading && ! this.props.attributes.eventId ) {
			return (
				<p>
					{ __(
						'Please select an event to display attendees for.',
						'event_espresso'
					) }
				</p>
			);
		}
		return <Spinner />;
	}

	getNoAttendeesContent() {
		return (
			<Fragment>
				<Placeholder
					icon="groups"
					label={ __( 'Event Attendees Block', 'event_espresso' ) }
				>
					{ this.getPlaceHolderContent() }
				</Placeholder>
			</Fragment>
		);
	}

	getAttendeesDisplay() {
		return (
			<EventAttendeesList attendees={ this.props.attendees }/>
		);
	}

	render() {
		const { attributes } = this.props;
		let { attendees } = this.props;
		attendees = uniqBy( attendees, 'ATT_ID' );
		const attendeesBlock = isEmpty( attendees ) ?
			this.getNoAttendeesContent() :
			this.getAttendeesDisplay();
		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Event Attendees Settings', 'event_espresso' ) }>
					<EditorEventSelect
						key="attendees-event-select"
						selectedEventId={ attributes.eventId }
						onEventSelect={ this.setEventId }
					/>
					<EditorDatetimeSelect
						key="attendees-datetime-select"
						selectedDatetimeId={ attributes.datetimeId }
						forEventId={ attributes.eventId }
						onDatetimeSelect={ this.setDatetimeId }
						addAllOptionLabel={
							__( 'Show Attendees for All Datetimes',
								'event_espresso'
							)
						}
					/>
					<EditorTicketSelect
						key="attendees-ticket-select"
						selectedTicketId={ attributes.ticketId }
						forEventId={ attributes.eventId }
						forDatetimeId={ attributes.datetimeId }
						onTicketSelect={ this.setTicketId }
						addAllOptionLabel={
							__( 'Show Attendees for All Tickets', 'event_espresso' )
						}
					/>
					<EditorStatusSelect
						statusType={ statusModel.STATUS_TYPE_REGISTRATION }
						selectedStatusId={ attributes.status }
						onStatusSelect={ this.setStatus }
						selectLabel={ __( 'Select Registration Status', 'event_espresso' ) }
						addAllOptionLabel={
							__( 'Show Attendees for All Registration Statuses', 'event_espresso' )
						}
					/>
					<QueryLimit
						label={ __( 'Number of Attendees to Display', 'event_espresso' ) }
						limit={ attributes.limit }
						onLimitChange={ this.setLimit }
						min={ -1 }
					/>
					<ToggleControl
						label={ __( 'Display Gravatar', 'event_espresso' ) }
						limit={ attributes.limit }
						checked={ attributes.showGravatar }
						onChange={ this.toggleShowGravatar }
					/>
					<ToggleControl
						label={ __( 'Display on Archives', 'event_espresso' ) }
						checked={ attributes.displayOnArchives }
						onChange={ this.toggleDisplayOnArchives }
					/>
				</PanelBody>
			</InspectorControls>
		);
		return [
			attendeesBlock,
			inspectorControls
		];
	}
}

export default withSelect( ( select, ownProps ) => {
	const { attributes } = ownProps;
	let { eventId, datetimeId, ticketId, status, showGravatar, limit } = attributes;
	const { getItems, isRequestingItems } = select( 'eventespresso/lists' );
	limit = parseInt( limit, 10 );
	limit = !isNaN( limit ) ? limit : -1;
	if ( limit === 0 ) {
		return {
			attendees: [],
			isLoading: false,
		};
	}
	// ensure that entity IDs are integers
	ticketId = parseInt( ticketId, 10 );
	datetimeId = parseInt( datetimeId, 10 );
	eventId = parseInt( eventId, 10 );
	const queryParams = [];
	// add query param for entity we are filtering for
	if ( ticketId !== 0 && !isNaN( ticketId ) ) {
		queryParams.push( `where[Registration.Ticket.TKT_ID]=${ ticketId }` );
	} else if ( datetimeId !== 0 && !isNaN( datetimeId ) ) {
		queryParams.push( `where[Registration.Ticket.Datetime.DTT_ID]=${ datetimeId }` );
	} else if ( eventId !== 0 && !isNaN( eventId ) ) {
		queryParams.push( `where[Registration.EVT_ID]=${ eventId }` );
	}
	if ( status !== '' && status !== null && status !== 'ANY' ) {
		queryParams.push( `where[Registration.Status.STS_ID]=${ status }` );
	}
	if ( showGravatar === true ) {
		queryParams.push( 'calculate=userAvatar' );
	}
	if ( limit > 0 ) {
		queryParams.push( `limit=${ limit }` );
	}
	queryParams.push( 'order_by[ATT_lname]=ASC' );
	queryParams.push( 'order_by[ATT_fname]=ASC' );
	const queryString = queryParams.join( '&' );
	// console.log( 'GET attendees ' + queryString );
	return {
		attendees: getItems( 'attendee', queryString ),
		isLoading: isRequestingItems( 'attendee', queryString ),
	};
} )( EventAttendeesEditor );
