/**
 * External imports
 */
import { dispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import {
	EntityList,
	FancyButton,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { __ } from '@eventespresso/i18n';
import { dateTimeModel } from '@eventespresso/model';

/**
 * Internal dependencies
 */
import { EditorDatesGridView, EditorDatesListView } from './';
import { default as PaginatedDatesListWithFilterBar } from './filter-bar';
import { EditEventDateFormModal } from '../';
import { DatesAndTicketsManagerModal } from '../../dates-and-tickets-metabox';

const {
	FormColumn,
	FormRow,
	FormSection,
	FormWrapper,
} = twoColumnAdminFormLayout;

const { createEntity } = dispatch( 'eventespresso/core' );
const { MODEL_NAME: DATETIME } = dateTimeModel;

/**
 * EditorDatesList
 * EntityList component for displaying event dates in the editor
 *
 * @class
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} view
 * @param {Function} retrieveDates
 * @param {mixed} otherProps
 */
class EditorDatesList extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			editorOpen: false,
			managerOpen: false,
			newEventDate: null,
		};
	}

	/**
	 * opens and closes EditEventDateFormModal
	 *
	 * @function
	 */
	toggleEditor = () => {
		this.setState( ( prevState ) => (
			{ editorOpen: ! prevState.editorOpen }
		) );
	};

	/**
	 * opens and closes DatesAndTicketsManagerModal
	 *
	 * @function
	 */
	toggleManager = () => {
		this.setState( ( prevState ) => (
			{ managerOpen: ! prevState.managerOpen }
		) );
	};

	/**
	 * @function
	 * @param {Object} eventEntity model object defining the Event
	 * Dates
	 */
	addNewEventDate = () => {
		createEntity( DATETIME, {} ).then(
			( newEventDate ) => {
				this.setState( ( prevState ) => {
					return {
						editorOpen: ! prevState.editorOpen,
						newEventDate: newEventDate,
					};
				} );
			}
		);
	};

	render() {
		const {
			view,
			event,
			entities,
			allDates,
			allTickets,
			...otherProps
		} = this.props;
		return (
			<FormWrapper>
				<EntityList
					entities={ entities }
					allDates={ allDates }
					allTickets={ allTickets }
					EntityGridView={ EditorDatesGridView }
					EntityListView={ EditorDatesListView }
					view={ view }
					event={ event }
					{ ...otherProps }
				/>
				<FormSection>
					<FormRow><br /></FormRow>
					<FormRow htmlClass={ 'ee-form-button-row' }>
						<FormColumn colSize={ 2 }>
							<FancyButton
								icon="calendar"
								style="wp-default"
								buttonText={ __( 'Add New Date', 'event_espresso' ) }
								onClick={ ( e ) => {
									e.preventDefault();
									e.stopPropagation();
									this.addNewEventDate();
								} }
							/>
						</FormColumn>
						<FormColumn colSize={ 2 } >
							<FancyButton
								icon="tickets-alt"
								style="wp-default"
								buttonText={ __(
									'Ticket Assignments',
									'event_espresso'
								) }
								onClick={ ( e ) => {
									e.preventDefault();
									e.stopPropagation();
									this.toggleManager();
								} }
							/>
						</FormColumn>
					</FormRow>
				</FormSection>
				<EditEventDateFormModal
					event={ event }
					eventDate={ this.state.newEventDate }
					closeModal={ this.toggleEditor }
					editorOpen={ this.state.editorOpen }
				/>
				<DatesAndTicketsManagerModal
					allDates={ allDates }
					allTickets={ allTickets }
					closeModal={ this.toggleManager }
					editorOpen={ this.state.managerOpen }
					modalProps={ {
						title: __(
							'Ticket Assignments for All Event Dates',
							'event_espresso'
						),
						closeButtonLabel: null,
					} }
				/>
			</FormWrapper>
		);
	}
}

export default PaginatedDatesListWithFilterBar( EditorDatesList );
