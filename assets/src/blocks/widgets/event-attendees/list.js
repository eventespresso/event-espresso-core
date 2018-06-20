/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import { AvatarImage } from '@eventespresso/components';

export const EventAttendeesList = ( { attendees } ) => {
	return (
		<div key="events-attendees-block" className="event-attendees-block-div">
			<h3>{ __( 'Event Attendees', 'event_espresso' ) }</h3>
			<ul className="event-attendees-ul">
				{ attendees.map( ( attendee, index ) => {
					return (
						<li key={ index } className="event-attendee-li">
							<p>
								<AvatarImage
									avatarUrl={
										attendee._calculated_fields.userAvatar
									}
									avatarClass={ 'event-attendee' }
								/>
								<span className="event-attendee-name-span">
									{ attendee.ATT_full_name }
								</span>
							</p>
						</li>
					);
				} ) }
			</ul>
		</div>
	);
};
