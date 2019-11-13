/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * a vertical line that separates details
 *
 * @function
 * @param {boolean} last
 * @return {Component} vertical line for separating date details
 */
const DetailsSeparator = ( { last = false } ) => ! last && (
	<div role="separator" className="ee-entity-details-separator"></div>
);

DetailsSeparator.propTypes = {
	last: PropTypes.bool.isRequired,
};

export default DetailsSeparator;
