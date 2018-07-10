/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import {
	PanelBody,
	Placeholder,
	ServerSideRender,
	Spinner,
	ToggleControl,
} from '@wordpress/components';

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
import * as attendeeModel from '../../../data/model/attendee';
import PropTypes from 'prop-types';
import { isEmpty, uniqBy } from 'lodash';

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
			status: statusModel.REGISTRATION_STATUS_ID.APPROVED,
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
		const value = status !== null && status.value ?
			status.value :
			statusModel.REGISTRATION_STATUS_ID.APPROVED;
		this.props.setAttributes( { status: value } );
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
			<ServerSideRender
				block="eventespresso/widgets-event-attendees"
				attributes={ this.props.attributes }
			/>
		);
	}

	render() {
		const { attributes } = this.props;
		const { attendees } = this.props;
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
						selectLabel=''
					/>
					<EditorTicketSelect
						key="attendees-ticket-select"
						selectedTicketId={ attributes.ticketId }
						forEventId={ attributes.eventId }
						forDatetimeId={ attributes.datetimeId }
						onTicketSelect={ this.setTicketId }
						selectLabel=''
					/>
					<EditorStatusSelect
						statusType={ statusModel.STATUS_TYPE_REGISTRATION }
						selectedStatusId={ attributes.status }
						onStatusSelect={ this.setStatus }
						selectLabel={ __( 'Select Registration Status', 'event_espresso' ) }
					/>
					<QueryLimit
						label={ __( 'Number of Attendees to Display', 'event_espresso' ) }
						limit={ attributes.limit }
						onLimitChange={ this.setLimit }
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
	const { getItems, isRequestingItems } = select( 'eventespresso/lists' );
	const queryString = attendeeModel.getQueryString(
		{
			forEventId: attributes.eventId,
			forDatetimeId: attributes.datetimeId,
			forTicketId: attributes.ticketId,
			forStatusId: attributes.status,
			showGravatar: attributes.showGravatar,
			limit: attributes.limit,
		}
	);
	return {
		attendees: getItems( 'attendee', queryString ),
		isLoading: isRequestingItems( 'attendee', queryString ),
	};
} )( EventAttendeesEditor );
