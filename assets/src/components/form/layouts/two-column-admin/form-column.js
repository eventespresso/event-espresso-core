import PropTypes from 'prop-types';

/**
 * FormColumn
 * "two-column-admin" form layout strategy component
 * for displaying a single "column" within a form row
 *
 * @constructor
 * @param {Object} children
 * @param {string} htmlClass
 * @param {number} offset
 * @param {number|string} colSize
 * @param {string} align
 * @param {Object} extraAttributes
 * @return {Object} rendered form row column
 */
const FormColumn = ( {
	children,
	htmlClass,
	colSize = 3,
	offset = 0,
	align = 'left',
	...extraAttributes
} ) => {
	const input = children ? children : null;
	if (
		! input ||
		( input.type && input.type.name && input.type.name === 'HiddenInput' )
	) {
		return input;
	}
	htmlClass = htmlClass ? `${ htmlClass } ` : '';
	htmlClass = offset ?
		`${ htmlClass }col-sm-${ colSize } offset-sm-${ offset }` :
		`${ htmlClass }col-sm-${ colSize }`;
	htmlClass += align === 'right' ? ' text-sm-right' : '';
	return (
		<div className={ htmlClass } { ...extraAttributes }>
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
