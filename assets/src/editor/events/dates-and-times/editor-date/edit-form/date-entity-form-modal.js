/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { withEditorModal } from '@eventespresso/editor-hocs';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import DateEntityForm from './date-entity-form';
import { dateEntityFormSchema } from './date-entity-form-schema';
import { dateEntityFormSubmitHandler } from './date-entity-form-submit-handler';
import withUpdateEventDateRelation from '../action-handlers/with-update-event-date-relation';

/**
 * @function
 * @param {Object} dateEntity model object defining the Event Date
 */
class DateEntityFormModal extends Component {
	static propTypes = {
		dateEntity: PropTypes.object,
		toggleEditor: PropTypes.func.isRequired,
		loadHandler: PropTypes.func,
		submitHandler: PropTypes.func,
		resetHandler: PropTypes.func,
	};

	constructor( props ) {
		super( props );
		this.state = {
			dateEntity: isModelEntityOfModel( props.dateEntity, 'datetime' ) ?
				props.dateEntity.clone( true ) :
				{},
			originalDateEntity: props.dateEntity ? props.dateEntity : {},
		};
	}

	/**
	 * @function
	 * @return {Object} data
	 */
	loadHandler = () => {
		return dateEntityFormSchema( this.state.dateEntity );
	};

	/**
	 * @function
	 * @param {Object} data
	 */
	submitHandler = ( data ) => {
		dateEntityFormSubmitHandler(
			this.state.dateEntity,
			data
		);
		this.props.replaceDateInStore( this.state.dateEntity );
		this.props.toggleEditor();
	};

	/**
	 * @function
	 */
	resetHandler = () => {
		this.setState( { dateEntity: this.state.originalDateEntity.clone( true ) } );
		this.props.toggleEditor();
	};

	render() {
		return (
			<DateEntityForm
				{ ...this.props }
				loadHandler={ this.loadHandler }
				submitHandler={ this.submitHandler }
				resetHandler={ this.resetHandler }
				dateEntity={ this.state.dateEntity }
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
		const replaceDateInStore = ( replaceDate ) => {
			receiveAndReplaceEntityRecords( 'datetime', [ replaceDate ] );
			updateEventDateRelation( replaceDate );
		};
		return { replaceDateInStore };
	} ),
] )( DateEntityFormModal );
