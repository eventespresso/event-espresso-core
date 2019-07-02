/**
 * External imports
 */
import classNames from 'classnames';

/**
 * @param {Array} children
 * @param {number} rowNumber
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} classes
 * @param {Object} classes
 * @param {string} rowType
 * @param {Object} extraProps
 * @return {Object} rendered tr
 */
const TableRow = ( {
	children,
	rowNumber,
	htmlId = '',
	htmlClass = '',
	classes = {},
	rowType = 'body',
	...extraProps
} ) => {
	rowType += 'RowClass';
	htmlId = htmlId ?
		`${ htmlId }-row-${ rowNumber }` :
		`ee-rTable-row-${ rowNumber }`;
	htmlClass = classNames(
		htmlClass,
		`ee-rTable-${ rowType }-row`,
		`ee-row-${ rowNumber }`,
		classes[ rowType ],
	);
	return (
		<tr id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</tr>
	);
};

export default TableRow;
