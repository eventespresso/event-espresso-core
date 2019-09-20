/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
	htmlId,
	htmlClass,
	classes,
	...extraProps
} ) => {
	htmlId = htmlId ?
		`${ htmlId }-row-${ rowNumber }-col-${ colNumber }` :
		`ee-rspnsv-table-row-${ rowNumber }-col-${ colNumber }`;
	htmlClass = classNames(
		htmlClass,
		'ee-rspnsv-table-body-td',
		`ee-col-${ colNumber }`,
		classes.bodyTdClass
	);
	return (
		<td id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</td>
	);
};

TableDataCell.propTypes = {
	children: PropTypes.node,
	rowNumber: PropTypes.number.isRequired,
	colNumber: PropTypes.number.isRequired,
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
	classes: PropTypes.object,
};

TableDataCell.defaultProps = {
	htmlId: '',
	htmlClass: '',
	classes: {},
};

export default TableDataCell;
