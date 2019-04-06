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
	htmlClass = htmlClass ?
		`${ htmlClass } ee-rTable-body-td col-${ colNumber }` :
		`ee-rTable-body-td col-${ colNumber }`;
	htmlClass = classes.bodyTdClass ?
		`${ htmlClass } ${ classes.bodyTdClass }` :
		htmlClass;
	return (
		<td id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</td>
	);
};

export default TableDataCell;
