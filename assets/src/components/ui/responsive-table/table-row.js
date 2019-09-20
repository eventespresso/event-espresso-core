/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

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
	htmlId,
	htmlClass,
	classes,
	rowType,
	...extraProps
} ) => {
	htmlId = htmlId ?
		`${ htmlId }-row-${ rowNumber }` :
		`ee-rspnsv-table-row-${ rowNumber }`;
	htmlClass = classNames(
		htmlClass,
		`ee-rspnsv-table-${ rowType }-row`,
		`ee-row-${ rowNumber }`,
		classes[ `${ rowType }RowClass` ],
	);
	return (
		<tr id={ htmlId } className={ htmlClass } { ...extraProps } >
			{ children }
		</tr>
	);
};

TableRow.propTypes = {
	children: PropTypes.node,
	rowNumber: PropTypes.number.isRequired,
	rowType: PropTypes.string,
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
	classes: PropTypes.object,
};

TableRow.defaultProps = {
	rowType: 'body',
	htmlId: '',
	htmlClass: '',
	classes: {},
};

export default TableRow;
