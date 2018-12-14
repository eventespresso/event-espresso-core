/**
 * External imports
 */
import { Component } from 'react';
import { __ } from '@eventespresso/i18n';

/**
 * EditorSaveCancelButtons
 * reusable form buttons
 *
 * @constructor
 * @param {Object} ticket
 * @param {Function} onClick    callback for adding date to exDates
 */
class EditorSaveCancelButtons extends Component {
	render() {
		const { onSubmit, onCancel } = this.props;
		let {
			divClass,
			submitLabel,
			submitClass,
			cancelLabel,
			cancelClass,
		} = this.props;
		divClass = divClass ?
			`${ divClass } ee-editor-buttons-div` :
			'ee-editor-buttons-div';
		submitLabel = submitLabel ?
			submitLabel :
			__( 'Submit', 'event_espresso' );
		submitClass = submitClass ?
			`${ submitClass } ee-editor-submit-button button button-primary` :
			'ee-editor-submit-button button button-primary';
		cancelLabel = cancelLabel ?
			cancelLabel :
			__( 'Cancel', 'event_espresso' );
		cancelClass = cancelClass ?
			`${ cancelClass } ee-editor-cancel-button button button-secondary` :
			'ee-editor-cancel-button button button-secondary';
		return (
			<div className={ divClass }>
				<button
					className={ submitClass }
					value={ 'submit' }
					onClick={ onSubmit }
				>
					{ submitLabel }
				</button>
				<button
					className={ cancelClass }
					value={ 'cancel' }
					onClick={ onCancel }
				>
					{ cancelLabel }
				</button>
			</div>
		);
	}
}

export default EditorSaveCancelButtons;
