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
import { isEmpty } from 'lodash';

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
			showGravatar: PropTypes.bool,
			displayOnArchives: PropTypes.bool,
		},
	};

	setEventId = ( eventId ) => {
		this.props.setAttributes(
			{
				eventId: parseInt( eventId.value, 10 ),
				datetimeId: 0,
				ticketId: 0,
			}
		);
	};

	setDatetimeId = ( datetimeId ) => {
		this.props.setAttributes(
			{
				datetimeId: parseInt( datetimeId.value, 10 ),
				ticketId: 0,
			}
		);
	};

	setTicketId = ( ticketId ) => {
		this.props.setAttributes( { ticketId: parseInt( ticketId.value, 10 ) } );
	};

	setStatus = ( status ) => {
		this.props.setAttributes( { status: status.value } );
	};

	setNumberOfAttendeesToDisplay = ( numberOfAttendeesToDisplay ) => {
		this.props.setAttributes( {
			numberOfAttendeesToDisplay: parseInt(
				numberOfAttendeesToDisplay.value
			)
		} );
	};

	toggleShowGravatar = ( showGravatar ) => {
		this.props.setAttributes( { showGravatar: showGravatar.value } );
	};

	toggleDisplayOnArchives = ( displayOnArchives ) => {
		this.props.setAttributes( { displayOnArchives: displayOnArchives.value } );
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
		const { attendees, attributes } = this.props;
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
					<ToggleControl
						label={ __( 'Display Gravatar', 'event_espresso' ) }
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
	let { eventId, datetimeId, ticketId, status, showGravatar } = attributes;
	let queryParams = [];
	ticketId = parseInt( ticketId, 10 );
	datetimeId = parseInt( datetimeId, 10 );
	eventId = parseInt( eventId, 10 );
	if ( ticketId !== 0 && ! isNaN( ticketId ) ) {
		queryParams.push( `[Registration.Ticket.TKT_ID]=${ ticketId }` );
	} else if ( datetimeId !== 0 && ! isNaN( datetimeId ) ) {
		queryParams.push( `[Registration.Ticket.Datetime.DTT_ID]=${ datetimeId }` );
	} else if ( eventId !== 0 && ! isNaN( eventId ) ) {
		queryParams.push( `[Registration.EVT_ID]=${ eventId }` );
	}
	if ( status !== '' ) {
		queryParams.push( `STS_ID=${ status }` );
	}
	if ( showGravatar === true ) {
		queryParams.push( 'calculate=userAvatar' );
	}
	if ( ! isEmpty( queryParams ) ) {
		const queryString = 'where' + queryParams.join( '&' );
		console.log( '    EventAttendees > withSelect() queryString = ' + queryString );
		const { getItems, isRequestingItems } = select( 'eventespresso/lists' );
		return {
			attendees: getItems( 'attendee', queryString ),
			isLoading: isRequestingItems( 'attendee', queryString ),
		};
	}
	return {
		attendees: [],
		isLoading: false,
	};
} )( EventAttendeesEditor );
