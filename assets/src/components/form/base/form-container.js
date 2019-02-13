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
 * @param {boolean} loading
 * @return {Object} form
 */
export const FormContainer = ( { children, loading } ) => {
	return (
		<div
			className={
				loading ?
					'ee-form-container-div' :
					'ee-form-container-div ee-form-fade-in'
			}
		>
			{ ! loading && children }
		</div>
	);
};
