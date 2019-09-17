/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @param {Array} children
 * @param {string} htmlClass
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableBody = ( { children, htmlClass, ...extraProps } ) => {
	htmlClass = classNames(
		htmlClass,
		'ee-rspnsv-table-body'
	);
	return (
		<tbody className={ htmlClass } { ...extraProps }>
			{ children }
		</tbody>
	);
};

TableBody.propTypes = {
	children: PropTypes.element.isRequired,
	htmlClass: PropTypes.string,
};

TableBody.defaultProps = {
	htmlClass: '',
};

export default TableBody;
