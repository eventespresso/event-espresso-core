/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component } from '@wordpress/element';
import {
	PanelBody,
	Placeholder,
	ToggleControl,
	Spinner,
	RangeControl,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { __ } from '@eventespresso/i18n';
import {
	EditorDatetimeSelect,
	EditorEventSelect,
	EditorStatusSelect,
	EditorTicketSelect,
	QueryLimit,
	EventAttendees,
} from '@eventespresso/components';
import {
	statusModel,
	attendeeModel,
} from '@eventespresso/model';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { CSS_CLASS_CORE_BLOCKS } from '../constants';

const defaultQueryData = {
	showExpired: true,
	limit: 50,
};

const isNewBlock = ( { eventId, datetimeId, ticketId } ) => eventId === 0 &&
	datetimeId === 0 &&
	ticketId === 0;

const DEFAULT_EMPTY_ARRAY = [];

/**
 * EventAttendeesEditor Component
 *
 * This returns the component for the `edit` argument on the `EventAttendees`
 * Block.
 */
export class EventAttendeesEditor extends Component {
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
			avatarSize: PropTypes.number,
			avatarClass: PropTypes.string,
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
			avatarSize: 24,
			avatarClass: 'contact',
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
	 * @param {Object} eventId
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
	 * @param {Object} datetimeId
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
	 * @param {Object} ticketId
	 */
	setTicketId = ( ticketId ) => {
		const value = ticketId !== null && ticketId.value ?
			parseInt( ticketId.value, 10 ) :
			0;
		this.props.setAttributes( { ticketId: value } );
	};

	/**
	 * Set status on attributes
	 * @param {Object} status
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
	 * Set the size for the gravatar displayed.
	 * @param {number} size
	 */
	setAvatarSize = size => {
		this.props.setAttributes( {
			avatarSize: size,
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
	 * Retrieve the Attendees List component for the given attributes
	 * @return {Component} The EventAttendees component
	 */
	getAttendeesDisplay() {
		const { isLoading, attendees } = this.props;
		const {
			showGravatar,
			avatarSize,
			avatarClass,
		} = this.props.attributes;

		const avatarOptions = {
			avatarWidth: avatarSize,
			avatarHeight: avatarSize,
			avatarClass,
		};

		if ( isLoading ) {
			return (
				<Placeholder>
					<Spinner />
				</Placeholder>
			);
		}

		if ( isNewBlock( this.props.attributes ) &&
			attendees === DEFAULT_EMPTY_ARRAY
		) {
			return (
				<Placeholder>
					{ __(
						'To get started, select what event you want to show attendees from in the block settings.',
						'event_espresso'
					) }
				</Placeholder>
			);
		}

		if ( ! isLoading && isEmpty( attendees ) ) {
			return (
				<Placeholder>
					{ __(
						'There are no attendees for selected options.',
						'event_espresso'
					) }
				</Placeholder>
			);
		}
		return <EventAttendees
			attendees={ attendees }
			showGravatar={ showGravatar }
			avatarOptions={ avatarOptions }
			isLoading={ isLoading }
			containerCssClass={ CSS_CLASS_CORE_BLOCKS }
		/>;
	}

	/**
	 * Returns inspector controls for the block.
	 *
	 * @param {Object} attributes
	 * @return {Component} The inspector controls component
	 */
	getInspectorControls( attributes ) {
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Filter By Settings', 'event_espresso' ) }>
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
				</PanelBody>
				<PanelBody title={ __( 'Gravatar Setttings', 'event_espresso' ) } >
					<ToggleControl
						label={ __( 'Display Gravatar', 'event_espresso' ) }
						checked={ attributes.showGravatar }
						onChange={ this.toggleShowGravatar }
					/>
					{ attributes.showGravatar &&
					<RangeControl
						label={ __( 'Size of Gravatar', 'event_espresso' ) }
						value={ attributes.avatarSize || 24 }
						min={ 10 }
						max={ 128 }
						onChange={ this.setAvatarSize }
					/>
					}
				</PanelBody>
				<PanelBody title={ __( 'Location Settings', 'event_espresso' ) } >
					<ToggleControl
						label={ __( 'Display on Archives', 'event_espresso' ) }
						checked={ attributes.displayOnArchives }
						onChange={ this.toggleDisplayOnArchives }
					/>
				</PanelBody>
			</InspectorControls> );
	}

	render() {
		return [
			this.getAttendeesDisplay(),
			this.getInspectorControls( this.props.attributes ),
		];
	}
}

export default withSelect( ( select, ownProps ) => {
	const defaultProps = { ...EventAttendeesEditor.defaultProps.attributes };
	const {
		eventId = defaultProps.eventId,
		datetimeId = defaultProps.datetimeId,
		ticketId = defaultProps.ticketId,
		status = defaultProps.status,
		limit = defaultProps.limit,
	} = ownProps.attributes;

	const queryData = {
		forEventId: eventId,
		forDatetimeId: datetimeId,
		forTicketId: ticketId,
		forStatusId: status,
		showGravatar: true,
		limit,
	};

	const queryString = attendeeModel.getQueryString( queryData );
	const {
		getAttendees,
		isRequestingAttendees,
	} = select( 'eventespresso/lists' );
	return {
		...EventAttendeesEditor.defaultProps,
		...ownProps,
		attendees: isNewBlock( { eventId, datetimeId, ticketId } ) ?
			DEFAULT_EMPTY_ARRAY :
			getAttendees( queryString ),
		isLoading: isRequestingAttendees( queryString ),
	};
} )( EventAttendeesEditor );
