/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';
import warning from 'warning';
import { Fragment } from '@wordpress/element';

/**
 * Internal imports
 */
import { AvatarImage } from '../ui/image';

const AttendeeListItem = ( {
	isLoading,
	attendee,
	showGravatar,
	avatarOptions = {},
} ) => {
	function getAvatarUrl() {
		const url = attendee.hasCalculatedField( 'userAvatar' ) ?
			attendee.userAvatar :
			'';
		return url === '' && avatarOptions.avatarUrl ?
			avatarOptions.avatarUrl :
			url;
	}

	function getAttendeeName() {
		return attendee.fname + ' ' + attendee.lname;
	}

	function getAvatar() {
		const url = getAvatarUrl();
		if ( ! isLoading && showGravatar && url === '' ) {
			warning(
				false,
				'showGravatar is true but there is no avatar url included ' +
				'with either the attendee entity or the avatarOptions prop'
			);
		}
		return showGravatar ?
			<AvatarImage avatarUrl={ url } { ...avatarOptions } /> :
			'';
	}

	if ( ! isModelEntityOfModel( attendee, 'attendee' ) ) {
		warning(
			false,
			'The EventAttendee component expects an attendee model entity.'
		);
		return '';
	}

	return (
		<Fragment>
			<li>{ getAvatar() }<span>{ getAttendeeName() }</span></li>
		</Fragment>
	);
};
export default AttendeeListItem;
