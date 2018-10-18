import PropTypes from 'prop-types';

/**
 * FormColumn
 * "two-column-admin" form layout strategy component
 * for displaying a single "column" within a form row
 *
 * @constructor
 * @param {Object} children
 * @param {boolean} offset
 * @param {number|string} colSize
 * @param {string} align
 * @return {Object} rendered form row column
 */
const FormColumn = ( {
	children,
	colSize = 2,
	offset = 0,
	align = 'left',
} ) => {
	const input = children ? children : null;
	if ( input === null || input.type === undefined ||
		( input.type.name && input.type.name === 'HiddenInput' )
	) {
		return input;
	}
	let htmlClass = offset ?
		`col-sm-${ colSize } offset-sm-${ offset }` :
		`col-sm-${ colSize }`;
	htmlClass += align === 'right' ? ' text-sm-right' : '';
	return (
		<div className={ htmlClass }>
			{ input }
		</div>
	);
};

FormColumn.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ),
	colSize: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	offset: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ),
	align: PropTypes.oneOf( [ 'left', 'right' ] ),
};

export default FormColumn;
