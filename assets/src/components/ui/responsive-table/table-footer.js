/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @param {boolean} showFooter
 * @param {Array} children
 * @param {string} htmlClass
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableFooter = ( { showFooter, children, htmlClass, ...extraProps } ) => {
	htmlClass = classNames(
		htmlClass,
		'ee-rspnsv-table-footer'
	);
	return showFooter ? (
		<tfoot className={ htmlClass } { ...extraProps }>
			{ children }
		</tfoot>
	) : null;
};

TableFooter.propTypes = {
	showFooter: PropTypes.bool.isRequired,
	children: PropTypes.node,
	htmlClass: PropTypes.string,
};

TableFooter.defaultProps = {
	htmlClass: '',
};

export default TableFooter;
