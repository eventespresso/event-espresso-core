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
	htmlId = htmlId ?
		`${ htmlId }-row-${ rowNumber }` :
		`ee-rTable-row-${ rowNumber }`;
	htmlClass = htmlClass ?
		`${ htmlClass } ee-rTable-${ rowType }-row row-${ rowNumber }` :
		`ee-rTable-${ rowType }-row row-${ rowNumber }`;
	rowType += 'RowClass';
	htmlClass = classes[ rowType ] ?
		`${ htmlClass } ${ classes[ rowType ] }` :
		htmlClass;
	return (
		<tr id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</tr>
	);
};

export default TableRow;
