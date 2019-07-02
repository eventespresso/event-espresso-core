/**
 * External imports
 */
import classNames from 'classnames';

/**
 * @param {mixed} children
 * @param {number} rowNumber
 * @param {number} colNumber
 * @param {string} rowType
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} classes
 * @param {Object} extraProps
 * @return {Object} rendered <th> heading cell
 */
const TableDataCell = ( {
	children,
	rowNumber,
	colNumber,
	htmlId = '',
	htmlClass = '',
	classes = {},
	...extraProps
} ) => {
	htmlId = htmlId ?
		`${ htmlId }-row-${ rowNumber }-col-${ colNumber }` :
		`ee-rTable-row-${ rowNumber }-col-${ colNumber }`;
	htmlClass = classNames(
		htmlClass,
		'ee-rTable-body-td',
		`ee-col-${ colNumber }`,
		classes.bodyTdClass
	);
	return (
		<td id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</td>
	);
};

export default TableDataCell;
