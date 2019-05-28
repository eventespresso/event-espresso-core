/**
 * External imports
 */
import classNames from 'classnames';

/**
 * @param {Array} children
 * @param {string} htmlClass
 * @param {Object} extraProps
 * @return {Object} rendered thead
 */
const TableHeader = ( { children, htmlClass, ...extraProps } ) => {
	htmlClass = classNames(
		htmlClass,
		'ee-rTable-header'
	);
	return (
		<thead className={ htmlClass } { ...extraProps }>
			{ children }
		</thead>
	);
};

export default TableHeader;
