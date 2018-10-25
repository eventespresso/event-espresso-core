/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component } from '@wordpress/element';
import {
	PanelBody,
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
import {
	statusModel,
} from '@eventespresso/model';
import PropTypes from 'prop-types';

const defaultQueryData = {
	showExpired: true,
	limit: 50,
};

/**
 * EventAttendeesEditor Component
 *
 * This returns the component for the `edit` argument on the `EventAttendees`
 * Block.
 */
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
			limit: 10,
		},
	};

	/**
	 * @param {Object} props
	 */
	constructor( props ) {
		super( props );
		const { eventId, datetimeId } = this.props.attributes;
		this.state = {
			eventQueryData: {
				...defaultQueryData,
			},
			datetimeQueryData: {
				...defaultQueryData,
				forEventId: eventId,
			},
			ticketQueryData: {
				...defaultQueryData,
				forDatetimeId: datetimeId,
			},
			statusQueryData: {
				...defaultQueryData,
				statusType: statusModel.STATUS_TYPE_REGISTRATION,
			},
		};
	}

	/**
	 * Set eventId on attributes
	 * @param {number} eventId
	 */
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
		this.setState( {
			datetimeQueryData: {
				...this.state.datetimeQueryData,
				forEventId: value,
			},
		} );
	};

	/**
	 * Set datetimeId on attributes
	 * @param {number} datetimeId
	 */
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
		this.setState( {
			ticketQueryData: {
				...this.state.ticketQueryData,
				forDatetimeId: value,
			},
		} );
	};

	/**
	 * Set ticketId on attributes
	 * @param {number} ticketId
	 */
	setTicketId = ( ticketId ) => {
		const value = ticketId !== null && ticketId.value ?
			parseInt( ticketId.value, 10 ) :
			0;
		this.props.setAttributes( { ticketId: value } );
	};

	/**
	 * Set status on attributes
	 * @param {number} status
	 */
	setStatus = ( status ) => {
		const value = status !== null && status.value ?
			status.value :
			statusModel.REGISTRATION_STATUS_ID.APPROVED;
		this.props.setAttributes( { status: value } );
	};

	/**
	 * Set limit for attendees to be shown in attributes.
	 * @param {number} limit
	 */
	setLimit = ( limit ) => {
		this.props.setAttributes( {
			limit: parseInt( limit, 10 ),
		} );
	};

	/**
	 * Sets whether to show gravatar for attendees in attributes.
	 * @param {boolean} showGravatar
	 */
	toggleShowGravatar = ( showGravatar ) => {
		this.props.setAttributes( { showGravatar: showGravatar } );
	};

	/**
	 * Sets whether to show block on archive pages in attributes.
	 * @param {boolean} displayOnArchives
	 */
	toggleDisplayOnArchives = ( displayOnArchives ) => {
		this.props.setAttributes( { displayOnArchives: displayOnArchives } );
	};

	/**
	 * Retrieve the ssr component for displaying attendees for given attributes.
	 * @return {Component} The ssr component
	 */
	getAttendeesDisplay = () => {
		return (
			<ServerSideRender
				block="eventespresso/event-attendees"
				attributes={ this.props.attributes }
			/>
		);
	};

	/**
	 * Returns inspector controls for the block.
	 *
	 * @param {Object} attributes
	 * @return {Component} The inspector controls component
	 */
	getInspectorControls = ( attributes ) => {
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Event Attendees Settings', 'event_espresso' ) }>
					<EditorEventSelect
						key="attendees-event-select"
						selected={ attributes.eventId }
						onSelect={ this.setEventId }
						queryData={ this.state.eventQueryData }
					/>
					{ attributes.eventId !== 0 &&
						<EditorDatetimeSelect
							key="attendees-datetime-select"
							selected={ attributes.datetimeId }
							onSelect={ this.setDatetimeId }
							queryData={ this.state.datetimeQueryData }
						/>
					}
					{ attributes.datetimeId !== 0 &&
						<EditorTicketSelect
							key="attendees-ticket-select"
							selected={ attributes.ticketId }
							onSelect={ this.setTicketId }
							queryData={ this.state.ticketQueryData }
						/>
					}
					<EditorStatusSelect
						key="attendees-status-select"
						selected={ attributes.status }
						onSelect={ this.setStatus }
						queryData={ this.state.statusQueryData }
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
			this.getInspectorControls( this.props.attributes ),
		];
	}
}
