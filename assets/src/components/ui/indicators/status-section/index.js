/**
 * External Imports
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { values } from 'lodash';

/**
 * Internal Imports
 */
import StatusCircle, { statusSizes } from '../status-circle';

/**
 * A component for a status information section for the given props.
 *
 * @param {string} statusLabel  The label for the status.
 * @param {string} statusValue  The represented value for the status.
 * @param {string} circleSize	The circle size css classname (should be one of
 *                              statusSizes from the status-circle component.
 * @param {string} className	Any custom css class to append to this component.
 * @param {*} 	   children     Any children to embed in the section container.
 * @param {string} statusCode	The status code for the status represented in
 * 								this section.
 * @return {*}
 * @constructor
 */
const StatusSection = ( {
	statusLabel,
	statusValue,
	circleSize,
	className,
	children,
	statusCode,
} ) => {
	const containerClass = classnames(
		className, 'ee-status-section-container'
	);
	const circleProps = { statusLabel, statusCode, circleSize };

	return (
		<section className={ containerClass }>
			<span className={ 'ee-status-section-label' }>
				{ statusLabel }
			</span>
			<span className={ 'ee-status-section-value' }>
				{ statusValue }
			</span>
			{ children }
			<StatusCircle { ...circleProps } />
		</section>
	);
};

StatusSection.propTypes = {
	statusLabel: PropTypes.string.isRequired,
	statusValue: PropTypes.string.isRequired,
	circleSize: PropTypes.oneOf( values( statusSizes ) ),
	className: PropTypes.string,
	children: PropTypes.any,
	statusCode: PropTypes.string.isRequired
};

StatusSection.defaultProps = {
	circleSize: statusSizes['20'],
	className: '',
	children: null,
};

export default StatusSection;