/**
 * External Imports
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { values } from 'lodash';

/**
 * Internal Imports
 */
import './style.css';

/**
 * A set of css class names for various sizes used by this component.
 *
 * @type {
 * 	{
 * 		'12': string,
 * 		'128': string,
 * 		'64': string,
 * 		'20': string,
 * 		'32': string
 * 	}
 * }
 */
export const statusSizes = {
	128: 'circle-size-128',
	64: 'circle-size-64',
	32: 'circle-size-32',
	20: 'circle-size-20',
	12: 'circle-size-12',
};

/**
 * A ui component displaying a styled circle for a given status code.
 * @param {string} statusCode  The entity status code to use in the style
 * @param {string} circleSize  The circle size style (see statusSizes)
 * @param {string} className   Any additional css classes to add.
 * @return {*}
 * @constructor
 */
const StatusCircle = ( { statusCode, circleSize, className } ) => {
	const statusClass = classnames(
		'ee-status-circle',
		'status-bg-' + statusCode,
		circleSize,
		className
	);
	return (
		<span className={ statusClass } />
	);
};

StatusCircle.propTypes = {
	statusCode: PropTypes.string.isRequired,
	circleSize: PropTypes.oneOf( values( statusSizes ) ),
	className: PropTypes.string,
};
StatusCircle.defaultProps = {
	circleSize: statusSizes[ 12 ],
	className: '',
};

export default StatusCircle;