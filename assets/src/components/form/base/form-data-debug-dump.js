/**
 * External imports
 */
import { __DEV__ } from '@eventespresso/eejs';

/**
 * Internal imports
 */
import './form-data-debug-dump.css';

/**
 * Displays form data in non-production environments
 *
 * @function
 * @param {Object} values
 * @return {Object} form data
 */
const FormDataDebugDump = ( { values } ) => {
	return __DEV__ ? (
		<div className="ee-form-data-dump-div">
			<h3>Form Data</h3>
			<pre id="form-data">
				{ JSON.stringify( values, 0, 2 ) }
			</pre>
			<p>
				form data is only displayed in development environments when <code>WP_DEBUG</code> is set to <code>true</code>
			</p>
		</div>
	) : null;
};

export default FormDataDebugDump;
