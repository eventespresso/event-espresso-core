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
import { ContactAvatar } from '../../common/contact/ContactAvatar';

export class EventAttendees extends Component {

	getPlaceHolderContent() {
		const { isLoading, attributes } = this.props;

		if ( ! isLoading && attributes.selectedEventId ) {
			return <p>
				{
					__(
						'There are no attendees for the selected Event yet.',
						'event_espresso',
					)
				}
			</p>;
		}
		if ( ! isLoading && ! attributes.selectedEventId ) {
			return <p>
				{ __(
					'Please select an event to display attendees for.',
					'event_espresso'
				) }
			</p>;
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
		const { attendees } = this.props;
		return (
			<div key="events-attendees-block">
				<h3>{ __( 'Event Attendees', 'event_espresso' ) }</h3>
				<ul className="event-attendees-ul">
					{ attendees.map( ( attendee, i ) =>
						<li key={ i } className="event-attendee-li">
							<p>
								<ContactAvatar avatar={{
									url: attendee._calculated_fields.userAvatar,
									baseClass: 'event-attendee',
									height: 32,
									width: 32
								}}/>
								<span className="event-attendee-name-span">{ attendee.ATT_full_name }</span>
							</p>
						</li>,
					) }
				</ul>
			</div>
		);
	}

	render() {
		const { attendees, setAttributes, attributes } = this.props;
		const inspectorControls = (
			<InspectorControls>
				<EventSelect
					key="attendees-event-select"
					selectedEventId={ attributes.selectedEventId }
					onEventSelect={ ( selectedEventId ) =>
						setAttributes( { selectedEventId } ) }
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
		const queryString = `Registration.EVT_ID=${ selectedEventId }&calculate=userAvatar`;
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
