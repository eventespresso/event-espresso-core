/**
 * Internal imports
 */
import './form-container.css';

/**
 * External imports
 */
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * FormContainer is a wrapper that hides the form while it is loading,
 * then fades it in once loading is complete
 *
 * @function
 * @param {Object} form
 * @param {string} htmlClass
 * @param {boolean} loading
 * @return {Object} form
 */
const FormContainer = ( { children, htmlClass, loading } ) => {
	const containerClass = classNames( {
		'ee-form-container-div': true,
		[ `${ htmlClass }` ]: htmlClass,
		'ee-form-fade-in': ! loading,
	} );
	return (
		<div className={ containerClass } >
			{ ! loading && children }
		</div>
	);
};

FormContainer.propTypes = {
	children: PropTypes.node,
	htmlClass: PropTypes.string,
	loading: PropTypes.bool,
};

export default FormContainer;
