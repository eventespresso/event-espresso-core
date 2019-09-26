/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * FormRow
 * "two-column-admin" form layout strategy component for
 * displaying a single "row" in the form
 *
 * @function
 * @param {Object} children
 * @param {string} htmlClass
 * @return {Object} rendered form row
 */
const FormRow = ( { children, htmlClass = '' } ) => {
	htmlClass = htmlClass ? `${ htmlClass } ee-form-row` : 'ee-form-row';
	return (
		<div className={ htmlClass }>
			{ children }
		</div>
	);
};

FormRow.propTypes = {
	children: PropTypes.node,
	htmlClass: PropTypes.string,
};

export default FormRow;
