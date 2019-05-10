/**
 * Internal imports
 */
import './form-container.css';

/**
 * External imports
 */
import classNames from 'classnames';


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
export const FormContainer = ( { children, htmlClass, loading } ) => {
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
