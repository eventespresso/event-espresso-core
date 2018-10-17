/**
 * Internal imports
 */
import './form-container.css';

/**
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
