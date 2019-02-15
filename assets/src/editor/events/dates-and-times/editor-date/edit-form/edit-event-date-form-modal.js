/**
 * External imports
 */
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';

/**
 * Internal dependencies
 */
import { default as EditEventDateForm } from './edit-event-date-form';
import { eventDateEntityFormSchema } from './event-date-entity-form-schema';
import {
	eventDateEntityFormSubmitHandler,
} from './event-date-entity-form-submit-handler';

/**
 * @function
 * @param {Object} eventDate    JSON object defining the Event Date
 */
class EditEventDateFormModal extends Component {
	constructor( props ) {
		super( props );
		// console.log( '' );
		// console.log( 'EditEventDateFormModal props: ', props );
		this.toggleEditor = props.closeModal;
		this.state = {
			eventDate: props.eventDate ? props.eventDate : {},
			originalEventDate: props.eventDate ? props.eventDate : {},
		};
	}

	/**
	 * @function
	 * @return {Object} data
	 */
	loadHandler = async () => {
		const data = eventDateEntityFormSchema( this.state.eventDate );
		console.log( 'EditEventDateFormModal.loadHandler() data', data );
		return data;
	};

	/**
	 * @function
	 * @param {Object} data
	 */
	submitHandler = async data => {
		console.log( 'EditEventDateFormModal.submitHandler()' );
		console.log( ' >>> SUBMITTING DATA <<<', data );
		const eventDate = eventDateEntityFormSubmitHandler(
			this.state.eventDate,
			data
		);
		console.log( ' >>> UPDATED EVENT <<<', eventDate );
		this.setState( { eventDate: eventDate } );
		this.toggleEditor();
	};

	/**
	 * @function
	 * @param {Object} event
	 */
	resetHandler = event => {
		console.log( 'EditEventDateFormModal.resetHandler()' );
		console.log( ' >>> FORM RESET <<<', event );
		this.setState( { eventDate: this.state.originalEventDate } );
	};

	render() {
		// console.log( 'EditEventDate.render()', this.props );
		return (
			<EditEventDateForm
				loadHandler={ this.loadHandler }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
				{ ...this.props }
			/>
		);
	}
}

/**
 * Enhanced EventDateEditor with Modal
 */
export default withEditorModal( {
	title: __( 'Event Date Editor', 'event_espresso' ),
	customClass: 'ee-event-date-editor-modal',
	closeButtonLabel: __( 'close event date editor', 'event_espresso' ),
} )( EditEventDateFormModal );
