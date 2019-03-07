/**
 * External imports
 */
import PropTypes from 'prop-types';
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
 * @param {Object} eventDate model object defining the Event Date
 */
class EditEventDateFormModal extends Component {
	static propTypes = {
		event: PropTypes.object,
		eventDate: PropTypes.object,
		loadHandler: PropTypes.func,
		submitHandler: PropTypes.func,
		resetHandler: PropTypes.func,
		// onUpdate: PropTypes.func.isRequired,
	};

	constructor( props ) {
		super( props );
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
	loadHandler = () => {
		return eventDateEntityFormSchema( this.state.eventDate );
	};

	/**
	 * @function
	 * @param {Object} data
	 * @return {Object} updated dateEntity
	 */
	submitHandler = async ( data ) => {
		return eventDateEntityFormSubmitHandler(
			this.props.event,
			this.state.eventDate,
			data
		).then(
			( eventDate ) => {
				this.setState( { eventDate: eventDate } );
				this.toggleEditor();
				// this.props.onUpdate();
			}
		);
	};

	/**
	 * @function
	 */
	resetHandler = () => {
		this.setState( { eventDate: this.state.originalEventDate } );
	};

	render() {
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
