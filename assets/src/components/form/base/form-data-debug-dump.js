/**
 * Internal imports
 */
import './form-data-debug-dump.css';

/**
 * @function
 * @param {Object} values
 * @return {Object} form data
 */
export const FormDataDebugDump = ( { values } ) => {
	return (
		<div className="ee-form-data-dump-div">
			<h3>Form Data</h3>
			<pre id="form-data">
				{ JSON.stringify( values, 0, 2 ) }
			</pre>
		</div>
	);
};