/**
 * External imports
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import FormColumn from './form-column';
import FormRow from './form-row';
import FormSection from './form-section';

/**
 * EditorSaveCancelButtons
 * reusable form buttons
 *
 * @param {Array} children
 * @param {string} htmlClass
 * @param {number} colSize
 * @param {number} offset
 * @return {Object} rendered form buttons
 */
const FormButtonsRow = ( {
	children,
	htmlClass,
	colSize,
	offset,
} ) => {
	const classes = htmlClass ?
		`${ htmlClass } ee-form-save-cancel-buttons-div` :
		'ee-form-save-cancel-buttons-div';
	return children && (
		<FormSection htmlClass={ classes }>
			<FormRow htmlClass={ 'ee-form-button-row' }>
				<FormColumn colSize={ colSize } offset={ offset }>
					{ children }
				</FormColumn>
			</FormRow>
		</FormSection>
	);
};

FormButtonsRow.propTypes = {
	children: PropTypes.node,
	htmlClass: PropTypes.string,
	colSize: PropTypes.number,
	offset: PropTypes.number,
};

FormButtonsRow.defaultProps = {
	buttons: null,
	colSize: 12,
	offset: 0,
};

export default FormButtonsRow;
