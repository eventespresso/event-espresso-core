/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/higher-order-components';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { dateTimeModel } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { default as EditEventDateForm } from './edit-event-date-form';
import { eventDateEntityFormSchema } from './event-date-entity-form-schema';
import {
	eventDateEntityFormSubmitHandler,
} from './event-date-entity-form-submit-handler';
import withUpdateEventDateRelation from '../action-handlers/with-update-event-date-relation';

const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * @function
 * @param {Object} eventDate model object defining the Event Date
 */
class EditEventDateFormModal extends Component {
	static propTypes = {
		event: PropTypes.object,
		eventDate: PropTypes.object,
		toggleEditor: PropTypes.func.isRequired,
		loadHandler: PropTypes.func,
		submitHandler: PropTypes.func,
		resetHandler: PropTypes.func,
	};

	constructor( props ) {
		super( props );
		this.state = {
			eventDate: props.eventDate ? props.eventDate.clone( true ) : {},
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
	 */
	submitHandler = ( data ) => {
		eventDateEntityFormSubmitHandler(
			this.props.event,
			this.state.eventDate,
			data
		);
		this.props.replaceDateInStore(
			this.state.eventDate,
			this.state.originalEventDate,
			this.props.event
		);
		this.props.toggleEditor();
	};

	/**
	 * @function
	 */
	resetHandler = () => {
		this.setState( { eventDate: this.state.originalEventDate.clone( true ) } );
		this.props.toggleEditor();
	};

	render() {
		return (
			<EditEventDateForm
				{ ...this.props }
				loadHandler={ this.loadHandler }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
				eventDate={ this.state.eventDate }
			/>
		);
	}
}

export default compose( [
	withEditorModal( {
		title: __( 'Event Date Editor', 'event_espresso' ),
		customClass: 'ee-event-date-editor-modal',
		closeButtonLabel: __( 'close event date editor', 'event_espresso' ),
	} ),
	withUpdateEventDateRelation,
	withDispatch( ( dispatch, { updateEventDateRelation } ) => {
		const { receiveAndReplaceEntityRecords } = dispatch( 'eventespresso/core' );
		const replaceDateInStore = ( replaceDate, originalDate, eventEntity ) => {
			replaceDate.id = originalDate.id;
			receiveAndReplaceEntityRecords( DATETIME, [ replaceDate ] );
			updateEventDateRelation( eventEntity, replaceDate );
		};
		return { replaceDateInStore };
	} ),
] )( EditEventDateFormModal );
