/**
 * External imports.
 */
import { Button } from '@wordpress/components';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { checkInModel } from '@eventespresso/model';
import { useCallback } from '@wordpress/element';

const { getCheckInActionText, getCheckInActionClassName } = checkInModel;

/**
 * A component outputting a button for the given checkIn entity.
 *
 * The button will have its coloring and action text presented from the context
 * of toggling the state of the given checkIn Entity.
 *
 * @param {BaseEntity|null} checkinEntity  A checkin entity or null (which
 * means not checked in yet.
 * @param {function} onClick  The callback to fire when the button is clicked.
 * @param {boolean}  force	  If true, then when the checkin entity is null or
 * has a status of checked out, this allows for an action that ignores checkin
 * restrictions.
 * @return {*}  The component rendered.
 * @constructor
 */
const CheckInButton = ( { checkinEntity, onClick, force } ) => {
	const clickHandler = useCallback(
		() => onClick( force ),
		[ checkinEntity, force ]
	);
	const buttonText = getCheckInActionText( checkinEntity, force );
	const cssClass = classnames(
		getCheckInActionClassName( checkinEntity, force ),
		'ee-button',
		'ee-roundish'
	);
	return <Button onClick={ clickHandler } className={ cssClass }>
		{ buttonText }
	</Button>;
};

CheckInButton.propTypes = {
	checkinEntity: PropTypes.object,
	onClick: PropTypes.func,
	force: PropTypes.bool,
};

CheckInButton.defaultProps = {
	checkinEntity: null,
	onClick: () => null,
	force: false,
};

export default CheckInButton;
