/**
 * External imports
 */
import { Dashicon } from '@wordpress/components';
import PropTypes from 'prop-types';
import { checkInModel } from '@eventespresso/model';

const { getCheckInStatusIcon, getCheckInStatusClassName } = checkInModel;

/**
 * A component displaying a check-in status indicator for the given check-in
 * entity.
 *
 * @param {BaseEntity|null} checkinEntity
 * @return {*}  component
 * @constructor
 */
const CheckInStatusIcon = ( { checkinEntity } ) => {
	return <Dashicon
		className={ getCheckInStatusClassName( checkinEntity ) }
		icon={ getCheckInStatusIcon( checkinEntity ) }
	/>;
};

CheckInStatusIcon.propTypes = { checkinEntity: PropTypes.object };
CheckInStatusIcon.defaultProps = { checkinEntity: null };

export default CheckInStatusIcon;
