/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/editor';
import { Component, Fragment } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { Placeholder, Spinner } from '@wordpress/components';

/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import { EventSelect } from '@eventespresso/components';
import EventAttendeesList from './list';

export class EventAttendees extends Component
{

	getPlaceHolderContent() {
		const { isLoading, attributes } = this.props;

		if ( !isLoading && attributes.selectedEventId ) {
			return <p>
				{
					__(
						'There are no attendees for the selected Event yet.',
						'event_espresso',
					)
				}
			</p>;
		}
		if ( !isLoading && !attributes.selectedEventId ) {
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

	render() {
		const { attendees, setAttributes, attributes } = this.props;
		const inspectorControls = (
			<InspectorControls>
				<EventSelect
					key="attendees-event-select"
					selectedEventId={ attributes.selectedEventId }
					onEventSelect={ ( selectedEventId ) => {
						setAttributes( {
								selectedEventId: parseInt( selectedEventId )
							}
						);
						console.log('** onEventSelect **');
						console.log('  selectedEventId: ' + selectedEventId);
						console.log('  attributes: ');
						console.log(attributes);
					}}
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
		selectedEventId: PropTypes.number,
	} ),
};

EventAttendees.defaultProps = {
	attendees: [],
	isLoading: true,
	attributes: {
		selectedEventId: 0,
	},
};

export default withSelect( ( select, ownProps ) => {
	const { attributes } = ownProps;
	const { selectedEventId = 0 } = attributes;
	const { getItems, isRequestingItems } = select( 'eventespresso/lists' );
	if ( selectedEventId ) {
		console.log( '** withSelect **' );
		console.log( '  selectedEventId: ' + selectedEventId );
		const queryString = `where[Registration.EVT_ID]=${ selectedEventId }&calculate=userAvatar`;
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
