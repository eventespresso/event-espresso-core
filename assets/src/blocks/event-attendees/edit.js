/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import {
	PanelBody,
	Placeholder,
	ToggleControl,
	Spinner,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { sprintf, _n, __ } from '@eventespresso/i18n';
import {
	EditorDatetimeSelect,
	EditorEventSelect,
	EditorStatusSelect,
	EditorTicketSelect,
	QueryLimit,
	EventAttendeeList,
} from '@eventespresso/components';
import { NotWithPostTypeCheck } from '@eventespresso/editor-hocs';
import {
	statusModel,
	attendeeModel,
	QUERY_ORDER_ASC,
	QUERY_ORDER_DESC,
	ALLOWED_ORDER_VALUES,
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

const DEFAULT_ARRAY = [];

let highestRequestedLimit = 200;

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
			orderBy: PropTypes.oneOf( [
				'id',
				'lastNameOnly',
				'firstNameOnly',
				'firstThenLastName',
				'lastThenFirstName',
			] ),
			order: PropTypes.oneOf( ALLOWED_ORDER_VALUES ),
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
			limit: 100,
			orderBy: 'lastThenFirstName',
			order: QUERY_ORDER_ASC,
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
	 * Set the orderBy attribute
	 * @param {string} orderBy
	 */
	setOrderBy = ( orderBy ) => {
		this.props.setAttributes( { orderBy } );
	};

	/**
	 * Set the order attribute
	 * @param {string} order
	 */
	setOrder = ( order ) => {
		this.props.setAttributes( { order } );
	};

	/**
	 * Set the size for the gravatar displayed.
	 * @param {number} size
	 */
	setAvatarSize = ( size ) => {
		this.props.setAttributes( {
			avatarSize: parseInt( size, 10 ),
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
	 * @return {Component} What to display for the attendee display.
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
			attendees === DEFAULT_ARRAY
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
		return <EventAttendeeList
			attendees={ this.applyLimit( attendees ) }
			showGravatar={ showGravatar }
			avatarOptions={ avatarOptions }
			isLoading={ isLoading }
			containerCssClass={ CSS_CLASS_CORE_BLOCKS }
			containerId={ 'ee-block-event-attendees' }
		/>;
	}

	/**
	 * This receives the array of attendees and applies the limit to it so that
	 * only the set limit of attendees is returned from the beginning of the
	 * array.
	 * @param {Array} attendees
	 * @return {Array} A new array of attendees with the applied limit
	 */
	applyLimit( attendees ) {
		if ( attendees.length <= this.props.attributes.limit ) {
			return attendees;
		}
		return attendees.slice( 0, this.props.attributes.limit );
	}

	/**
	 * Returns inspector controls for the block.
	 *
	 * @param {Object} attributes
	 * @return {Component} The inspector controls component
	 */
	getInspectorControls( attributes ) {
		const countAttendees = this.props.attendees.length || 0;
		return (
			<InspectorControls>
				<PanelBody title={ __(
					'Filter By Settings',
					'event_espresso'
				) }>
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
						label={ __(
							'Select Registration Status',
							'event_espresso'
						) }
					/>
					<QueryLimit
						label={ __(
							'Number of Attendees to Display:',
							'event_espresso'
						) }
						limit={ attributes.limit }
						onLimitChange={ this.setLimit }
						min={ 1 }
						withSlider={ false }
						help={ sprintf(
							_n(
								'Used to adjust the number of attendees displayed (There is %d total attendee for the current filter settings).',
								'Used to adjust the number of attendees displayed (There are %d total attendees for the current filter settings).',
								countAttendees,
								'event_espresso'
							),
							countAttendees
						) }
					/>
					<SelectControl
						label={ __( 'Order Attendees by:', 'event_espresso' ) }
						value={ attributes.orderBy }
						options={ [
							{
								label: __( 'Attendee id', 'event_espresso' ),
								value: 'id',
							},
							{
								label: __( 'Last name only', 'event_espresso' ),
								value: 'lastNameOnly',
							},
							{
								label: __(
									'First name only',
									'event_espresso'
								),
								value: 'firstNameOnly',
							},
							{
								label: __(
									'First, then Last name',
									'event_espresso'
								),
								value: 'firstThenLastName',
							},
							{
								label: __(
									'Last, then First name',
									'event_espresso'
								),
								value: 'lastThenFirstName',
							},
						] }
						onChange={ this.setOrderBy }
					/>
					<SelectControl
						label={ __( 'Sort order:', 'event_espresso' ) }
						value={ attributes.order }
						options={ [
							{
								label: __( 'Ascending', 'event_espresso' ),
								value: QUERY_ORDER_ASC,
							},
							{
								label: __( 'Descending', 'event_espresso' ),
								value: QUERY_ORDER_DESC,
							},
						] }
						onChange={ this.setOrder }
					/>
				</PanelBody>
				<PanelBody title={ __(
					'Gravatar Setttings',
					'event_espresso'
				) } >
					<ToggleControl
						label={ __( 'Display Gravatar', 'event_espresso' ) }
						checked={ attributes.showGravatar }
						onChange={ this.toggleShowGravatar }
						help={ attributes.showGravatar ?
							__(
								'Gravatar images are shown for each attendee.',
								'event_espresso'
							) :
							__(
								'No gravatar images are shown for each attendee.',
								'event_espresso'
							) }
					/>
					{ attributes.showGravatar &&
					<RangeControl
						label={ __( 'Size of Gravatar', 'event_espresso' ) }
						value={ attributes.avatarSize }
						min={ 10 }
						max={ 128 }
						onChange={ this.setAvatarSize }
					/>
					}
				</PanelBody>
				<NotWithPostTypeCheck excludedPostTypeSlugs={ 'page' }>
					<PanelBody title={ __(
						'Archive Settings',
						'event_espresso'
					) } >
						<ToggleControl
							label={ __( 'Display on Archives', 'event_espresso' ) }
							checked={ attributes.displayOnArchives }
							onChange={ this.toggleDisplayOnArchives }
							help={ attributes.displayOnArchives ?
								__(
									'Attendees are shown whenever this post is listed in an archive view.',
									'event_espresso'
								) :
								__(
									'Attendees are hidden whenever this post is listed in an archive view.',
									'event_espresso'
								)
							}
						/>
					</PanelBody>
				</NotWithPostTypeCheck>
			</InspectorControls>
		);
	}

	render() {
		return (
			<Fragment>
				{ this.getAttendeesDisplay() }
				{ this.getInspectorControls( this.props.attributes ) }
			</Fragment>
		);
	}
}

export default withSelect( ( select, ownProps ) => {
	const defaultProps = { ...EventAttendeesEditor.defaultProps.attributes };
	const {
		eventId = defaultProps.eventId,
		datetimeId = defaultProps.datetimeId,
		ticketId = defaultProps.ticketId,
		status = defaultProps.status,
		orderBy = defaultProps.orderBy,
		order = defaultProps.order,
		limit = defaultProps.limit,
	} = ownProps.attributes;

	// This ensures that we don't query unnecessarily since if the limit is
	// lower than a query we've already done, then we already have cached data
	// for this limit (and cache is still busted by any other query changes)
	highestRequestedLimit = ! limit ||
		isNaN( limit ) ||
		limit <= highestRequestedLimit ?
		highestRequestedLimit :
		limit;

	const queryData = {
		forEventId: eventId,
		forDatetimeId: datetimeId,
		forTicketId: ticketId,
		forStatusId: status,
		showGravatar: true,
		defaultWhereConditions: 'full_this_minimum_others',
		order,
		orderBy,
		limit: highestRequestedLimit,
	};

	const queryString = attendeeModel.getQueryString( queryData );
	const {
		getAttendees,
		isRequestingAttendees,
	} = select( 'eventespresso/lists' );
	return {
		...EventAttendeesEditor.defaultProps,
		...ownProps,
		attributes: {
			...EventAttendeesEditor.defaultProps.attributes,
			...ownProps.attributes,
		},
		attendees: isNewBlock( { eventId, datetimeId, ticketId } ) ?
			DEFAULT_ARRAY :
			getAttendees( queryString ),
		isLoading: isRequestingAttendees( queryString ),
	};
} )( EventAttendeesEditor );
