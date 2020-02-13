/**
 * External imports
 */
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * @function
 * @param {Object|string} heading
 * @param {Object|string} value
 * @return {Object} rendered headings row
 */
const ResponsiveCell = ({ heading, value }) => {
	return (
		<Fragment>
			<div aria-hidden className={'ee-rspnsv-table-mobile-only-column-header'}>
				{heading}
			</div>
			<div className={'ee-rspnsv-table-mobile-only-column-value'}>{value}</div>
		</Fragment>
	);
};

ResponsiveCell.propTypes = {
	heading: PropTypes.node,
	value: PropTypes.node,
};

ResponsiveCell.defaultProps = {
	heading: '',
	value: '',
};

export default ResponsiveCell;
