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
		const { event, view, ...otherProps } = this.props;
		return (
			<FormWrapper>
				<EntityList
					EntityGridView={ EditorDatesGridView }
					EntityListView={ EditorDatesListView }
					view={ view }
					event={ event }
					{ ...otherProps }
				/>
				<FormSection>
					<FormRow>
						<FormColumn colSize={ 2 } offset={ 10 } >
							<br />
							<FancyButton
								icon="calendar"
								style="wp-default"
								label={ __( 'Add New Date', 'event_espresso' ) }
								onClick={ ( e ) => {
									e.preventDefault();
									e.stopPropagation();
									this.addNewEventDate();
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
			</FormWrapper>
		);
	}
}

export default PaginatedDatesListWithFilterBar( EditorDatesList );
