/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { Placeholder, Spinner, ToggleControl } from '@wordpress/components';

/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';
import { EventSelect } from '@eventespresso/components';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { EventAttendeesList } from './list';

export class EventAttendees extends Component
{
	constructor() {
		super( ...arguments );
		this.setEventId = this.setEventId.bind( this );
		this.setDatetimeId = this.setDatetimeId.bind( this );
		this.setTicketId = this.setTicketId.bind( this );
		this.toggleShowGravatar = this.toggleShowGravatar.bind( this );
		this.toggleDisplayOnArchives = this.toggleDisplayOnArchives.bind( this );
	}

	getPlaceHolderContent() {
		const { isLoading, attributes } = this.props;

		if ( ! isLoading && attributes.eventId ) {
			return <p>
				{
					__(
						'There are no attendees for the selected Event yet.',
						'event_espresso',
					)
				}
			</p>;
		}
		if ( ! isLoading && ! attributes.eventId ) {
			return <p>
				{ __(
					'Please select an event to display attendees for.',
					'event_espresso'
				) }
			</p>;
		}
		return <Spinner/>;
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
		const { attendees } = this.props;
		return (
			<EventAttendeesList attendees={ attendees }/>
		);
	}

	setEventId( eventId ) {
		const { setAttributes } = this.props;
		setAttributes( { eventId: parseInt( eventId ) } );
	}

	setDatetimeId() {
		const { setAttributes } = this.props;
		const { datetimeId } = this.props.attributes;
		setAttributes( { eventId: parseInt( datetimeId ) } );
	}

	setTicketId() {
		const { setAttributes } = this.props;
		const { ticketId } = this.props.attributes;
		setAttributes( { eventId: parseInt( ticketId ) } );
	}
	/*
		status: attributes.status,
	*/

	toggleShowGravatar() {
		const { setAttributes } = this.props;
		const { showGravatar } = this.props.attributes;
		setAttributes( { showGravatar: ! showGravatar } );
	}

	toggleDisplayOnArchives() {
		const { setAttributes } = this.props;
		const { displayOnArchives } = this.props.attributes;
		setAttributes( { displayOnArchives: ! displayOnArchives } );
	}

	render() {
		const { attendees, attributes } = this.props;
		const inspectorControls = (
			<InspectorControls>

				<EventSelect
					key="attendees-event-select"
					eventId={ attributes.eventId }
					onEventSelect={ this.setEventId }
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

			</InspectorControls>
		);
		const attendeesBlock = isEmpty( attendees ) ?
			this.getNoAttendeesContent() :
			this.getAttendeesDisplay();

		return [
			inspectorControls,
			attendeesBlock,
		];
	}
}

EventAttendees.propTypes = {
	attendees: PropTypes.array,
	isLoading: PropTypes.bool,
	attributes: PropTypes.shape( {
		eventId: PropTypes.number,
	} ),
};

EventAttendees.defaultProps = {
	attendees: [],
	isLoading: true,
	attributes: {
		eventId: 0,
	},
};

export default withSelect( ( select, ownProps ) => {
	const { attributes } = ownProps;
	const { eventId, datetimeId, ticketId, status, showGravatar } = attributes;
	let queryParams = [];
	console.log( 'attributes: ');
	console.log( attributes );
	if ( parseInt( ticketId ) !== 0 ) {
		console.log( ' > SET ticketId: ' + ticketId );
		queryParams.push( `[Registration.Ticket.TKT_ID]=${ ticketId }` );
	} else if ( parseInt( datetimeId ) !== 0 ) {
		console.log( ' > SET datetimeId: ' + datetimeId );
		queryParams.push( `[Registration.Ticket.Datetime.DTT_ID]=${ datetimeId }` );
	} else if ( parseInt( eventId ) !== 0 ) {
		console.log( ' > SET eventId: ' + eventId );
		queryParams.push( `[Registration.EVT_ID]=${ eventId }` );
	}
	if ( status !== '' ) {
		queryParams.push( `[Registration.STS_ID]=${ status }`);
	}
	if ( showGravatar === true ) {
		queryParams.push( 'calculate=userAvatar');
	}
	if ( ! isEmpty( queryParams ) ) {
		const queryString = 'where' + queryParams.join( '&' );
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
} )( EventAttendees );
