/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * @param {mixed} children
 * @param {number} rowNumber
 * @param {number} colNumber
 * @param {string} rowType
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} cssClasses
 * @param {Object} extraProps
 * @return {Object} rendered <th> heading cell
 */
const TableHeaderCell = ( {
	children,
	rowNumber,
	colNumber,
	rowType,
	htmlId,
	htmlClass,
	cssClasses,
	...extraProps
} ) => {
	htmlId = htmlId ?
		`${ htmlId }-${ rowType }-row-${ rowNumber }-col-${ colNumber }` :
		`ee-rspnsv-table-${ rowType }-row-${ rowNumber }-col-${ colNumber }`;
	htmlClass = htmlClass ?
		`${ htmlClass } ee-rspnsv-table-${ rowType }-th ee-col-${ colNumber }` :
		`ee-rspnsv-table-${ rowType }-th ee-col-${ colNumber }`;
	const rowTypeClass = rowType + 'ThClass';
	htmlClass = cssClasses[ rowTypeClass ] ?
		`${ htmlClass } ${ cssClasses[ rowTypeClass ] }` :
		htmlClass;
	if ( rowType === 'header' ) {
		extraProps.role = "columnheader";
		extraProps.scope = "col"
	} else if ( rowType === 'body' ) {
		extraProps.scope = "row";
	}
	return (
		<th id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</th>
	);
};

TableHeaderCell.propTypes = {
	children: PropTypes.node,
	rowNumber: PropTypes.number.isRequired,
	colNumber: PropTypes.number.isRequired,
	rowType: PropTypes.string,
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
	cssClasses: PropTypes.object,
};

TableHeaderCell.defaultProps = {
	rowType: 'body',
	htmlId: '',
	htmlClass: '',
	cssClasses: {},
};

export default TableHeaderCell;
