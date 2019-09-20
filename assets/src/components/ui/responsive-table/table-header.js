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
const TableHeader = ( { children, htmlClass, ...extraProps } ) => {
	htmlClass = classNames(
		htmlClass,
		'ee-rspnsv-table-header'
	);
	return (
		<thead className={ htmlClass } { ...extraProps }>
			{ children }
		</thead>
	);
};

TableHeader.propTypes = {
	children: PropTypes.node,
	htmlClass: PropTypes.string,
};

TableHeader.defaultProps = {
	htmlClass: '',
};


export default TableHeader;
