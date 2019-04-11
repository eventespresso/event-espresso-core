/**
 * Internal imports
 */
import './form-container.css';

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
	htmlClass = htmlClass ?
		`${ htmlClass } ee-form-container-div` :
		'ee-form-container-div';
	htmlClass = loading ?
		htmlClass :
		`${ htmlClass } ee-form-fade-in`;
	return (
		<div className={ htmlClass } >
			{ ! loading && children }
		</div>
	);
};
