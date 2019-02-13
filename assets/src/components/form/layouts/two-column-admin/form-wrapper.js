import PropTypes from 'prop-types';

/**
 * FormWrapper
 * "two-column-admin" form layout strategy component
 * that wraps the main form in a div order to apply
 * an HTML class for styling purposes
 *
 * @function
 * @param {Object} children
 * @param {string} htmlId
 * @param {string} htmlClass
 * @return {Object} rendered form section
 */
const FormWrapper = ( { children, htmlId = '', htmlClass = '' } ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-two-column-admin` :
		'ee-two-column-admin';
	return (
		<div id={ htmlId } className={ htmlClass }>
			{ children }
		</div>
	);
};

FormWrapper.propTypes = {
	children: PropTypes.oneOfType( [
		PropTypes.object,
		PropTypes.arrayOf( PropTypes.object ),
	] ),
	htmlId: PropTypes.string,
	htmlClass: PropTypes.string,
};

export default FormWrapper;
