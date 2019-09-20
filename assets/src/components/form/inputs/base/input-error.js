import PropTypes from 'prop-types';
import { Field } from 'react-final-form';

/**
 * Internal imports
 */
import './input-error.css';

/**
 * @function InputError
 * @param {string} inputName
 * @return {Object} rendered help text
 */
export const InputError = ( { inputName } ) => (
	<Field
		name={ inputName }
		subscription={ { touched: true, dirty: true, error: true } }
		render={ ( { meta: { touched, dirty, error } } ) =>
			( touched || dirty ) && error ?
				<div
					id={ `${ inputName }-input-error` }
					className="ee-form-input-error"
				>
					<span>{ error }</span>
				</div> :
				null
		}
	/>
);

InputError.propTypes = { inputName: PropTypes.string.isRequired };
