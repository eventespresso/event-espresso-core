/**
 * External imports
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { default as FormColumn } from './form-column';
import { default as FormRow } from './form-row';
import { default as FormSection } from './form-section';

/**
 * EditorSaveCancelButtons
 * reusable form buttons
 *
 * @constructor
 * @param {Object} submitButton
 * @param {Object} cancelButton
 * @param {string} htmlClass
 * @param {number} colSize
 * @param {number} offset
 * @return {Object} rendered form buttons
 */
class FormSaveCancelButtons extends Component {
	render() {
		const {
			submitButton,
			cancelButton,
			colSize = 6,
			offset = 3,
		} = this.props;
		let { htmlClass } = this.props;
		htmlClass = htmlClass ?
			`${ htmlClass } ee-form-save-cancel-buttons-div` :
			'ee-form-save-cancel-buttons-div';
		return (
			<FormSection htmlClass={ htmlClass }>
				<FormRow>
					<FormColumn colSize={ colSize } offset={ offset }>
						{ submitButton }
						{ cancelButton }
					</FormColumn>
				</FormRow>
			</FormSection>
		);
	}
}

export default FormSaveCancelButtons;
