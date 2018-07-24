/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component } from '@wordpress/element';
import {
	PanelBody,
	Placeholder,
	ServerSideRender,
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
import PropTypes from 'prop-types';
import { isEmpty, uniqBy } from 'lodash';

export default class EventAttendeesEditor extends Component {
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
			limit: 10
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

	getAttendeesDisplay = () => {
		return (
			<ServerSideRender
				block="eventespresso/widgets-event-attendees"
				attributes={ this.props.attributes }
			/>
		);
	};

	getInspectorControls = ( attributes ) => {
		return (
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
					/>
					<EditorTicketSelect
						key="attendees-ticket-select"
						selectedTicketId={ attributes.ticketId }
						forEventId={ attributes.eventId }
						forDatetimeId={ attributes.datetimeId }
						onTicketSelect={ this.setTicketId }
					/>
					<EditorStatusSelect
						key="attendees-status-select"
						statusType={ statusModel.STATUS_TYPE_REGISTRATION }
						selectedStatusId={ attributes.status }
						onStatusSelect={ this.setStatus }
						label={ __( 'Select Registration Status', 'event_espresso' ) }
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
			</InspectorControls> );
	};

	render() {
		return [
			this.getAttendeesDisplay(),
			this.getInspectorControls( this.props.attributes )
		];
	}
}