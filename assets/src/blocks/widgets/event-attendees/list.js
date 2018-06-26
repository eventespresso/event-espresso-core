/**
 * External dependencies
 */
import { __ } from '@eventespresso/i18n';
import { isEmpty } from 'lodash';


/**
 * Internal dependencies
 */
import { AvatarImage } from '@eventespresso/components';

export const EventAttendeesList = ( { attendees } ) => {
	return !isEmpty( attendees ) ?
		(
			<div key="events-attendees-block" className="event-attendees-block-div">
				<h3>{ __( 'Event Attendees', 'event_espresso' ) }</h3>
				<ul className="event-attendees-ul">
					{ attendees.map( ( attendee, index ) => {
						const avatar = typeof attendee._calculated_fields !== 'undefined' ?
							(
								<AvatarImage
									avatarUrl={
										attendee._calculated_fields.userAvatar
									}
									avatarClass={ 'event-attendee' }
								/>
							) :
							'';
						return (
							<li key={ index } className="event-attendee-li">
								<p>
									{ avatar }
									<span className="event-attendee-name-span">
									{ attendee.ATT_full_name }
								</span>
								</p>
							</li>
						);
					} ) }
				</ul>
			</div>
		) :
		null;
};
