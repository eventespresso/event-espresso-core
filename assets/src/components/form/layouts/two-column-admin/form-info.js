/**
 * External imports
 */
import { Component } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { default as FormColumn } from './form-column';
import { default as FormRow } from './form-row';
import { default as FormInfoBase } from '../../base/form-info-base';

/**
 * FormInfo
 * displays instructions or other important information
 * that users may require to properly complete a form.
 *
 * @constructor
 * @param {string|Object} formInfo
 * @param {string} dashicon
 * @param {string} htmlClass
 */
class FormInfo extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			dismiss: false,
		};
	}

	dismiss = () => {
		this.setState( ( prevState ) => ( { dismiss: ! prevState.dismiss } ) );
	};

	render() {
		const {
			formInfo,
			dashicon = '',
			dismissable = true,
			colSize = 6,
			offset = 3,
		} = this.props;
		let rowClass = this.state.dismiss ?
			'ee-form-info-row dismissed' :
			'ee-form-info-row';
		rowClass = dismissable ?
			`${ rowClass } is-dismissable` :
			rowClass;
		return formInfo ? (
			<FormRow htmlClass={ rowClass }>
				<FormColumn colSize={ colSize } offset={ offset }>
					<FormInfoBase
						formInfo={ formInfo }
						dashicon={ dashicon }
						onDismiss={ dismissable ? this.dismiss : null }
					/>
				</FormColumn>
			</FormRow>
		) : null;
	}
}

export default FormInfo;
