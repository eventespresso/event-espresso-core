/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * @param {mixed} children
 * @param {number} rowNumber
 * @param {number} colNumber
 * @param {string} htmlId
 * @param {string} htmlClass
 * @param {Object} cssClasses
 * @param {Object} extraProps
 * @return {Object} rendered <th> heading cell
 */
const TableDataCell = ( {
	children,
	rowNumber,
	colNumber,
	htmlId,
	htmlClass,
	cssClasses,
	...extraProps
} ) => {
	const id = htmlId ?
		`${ htmlId }-row-${ rowNumber }-col-${ colNumber }` :
		`ee-rspnsv-table-row-${ rowNumber }-col-${ colNumber }`;
	const classes = classNames(
		htmlClass,
		'ee-rspnsv-table-body-td',
		`ee-col-${ colNumber }`,
		cssClasses.bodyTdClass
	);
	return (
		<td id={ id } className={ classes } { ...extraProps } >
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
	cssClasses: PropTypes.object,
};

TableDataCell.defaultProps = {
	htmlId: '',
	htmlClass: '',
	cssClasses: {},
};

export default TableDataCell;
