/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import { dispatch } from '@wordpress/data';
import { Component } from '@wordpress/element';
import {
	EntityList,
	FancyButton,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { withEditor } from '@eventespresso/higher-order-components';
import { __ } from '@eventespresso/i18n';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { withPriceTypes } from '../data';
import { EditTicketFormModal } from '../';
import { EditorTicketsGridView } from './grid-view/';
import { EditorTicketsListView } from './list-view/';
import PaginatedTicketsListWithFilterBar from './filter-bar';
import {
	ticketPriceCalculatorMenuItem,
	TicketPriceCalculatorFormModal,
	withTicketPriceCalculator,
} from './price-calculator';
import {
	withTicketAssignmentsManager,
	TicketAssignmentsManagerModal,
} from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;
const { createEntity } = dispatch( 'eventespresso/core' );

/**
 * EditorTicketsList
 * EntityList component for displaying event tickets in the editor
 *
 * @function
 * @param {Array} entities    array of JSON objects defining the tickets
 * @param {string} view
 * @param {mixed} otherProps
 * @return {Component}          list of rendered tickets
 */
class EditorTicketsList extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			managerOpen: false,
			newTicket: null,
		};
	}

	/**
	 * opens and closes TicketAssignmentsManagerModal
	 *
	 * @function
	 * @param {Object} ticket
	 */
	toggleTicketManager = ( ticket ) => {
		this.setState( ( prevState ) => (
			{
				newTicket: isModelEntityOfModel( ticket, 'ticket' ) ?
					ticket :
					prevState.newTicket,
			}
		) );
		this.props.toggleTicketAssignments();
	};

	/**
	 * @function
	 */
	addNewTicket = () => {
		createEntity( 'ticket', {} ).then(
			( newTicket ) => {
				this.setState( () => ( { newTicket } ) );
				this.props.toggleEditor();
			}
		);
	};

	/**
	 * @function
	 * @return {Object} rendered button
	 */
	addNewTicketButton = () => {
		return (
			<FancyButton
				icon="tickets-alt"
				style="wp-default"
				buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
				onClick={ ( e ) => {
					e.preventDefault();
					e.stopPropagation();
					this.addNewTicket();
				} }
			/>
		);
	};

	render() {
		const {
			entities,
			allDates,
			editorOpen,
			toggleEditor,
			showCalculator,
			toggleCalculator,
			showTicketAssignments,
			toggleTicketAssignments,
			view = 'grid',
			...otherProps
		} = this.props;
		const calculator = ticketPriceCalculatorMenuItem(
			this.state.newTicket,
			toggleCalculator
		);
		return (
			<FormWrapper>
				<EntityList
					entities={ entities }
					allDates={ allDates }
					EntityGridView={ EditorTicketsGridView }
					EntityListView={ EditorTicketsListView }
					view={ view }
					noResultsText={
						__(
							'no results found (try changing filters)',
							'event_espresso'
						)
					}
					{ ...otherProps }
				/>
				<FormSaveCancelButtons
					submitButton={ this.addNewTicketButton() }
				/>
				<EditTicketFormModal
					ticket={ this.state.newTicket }
					toggleEditor={ toggleEditor }
					editorOpen={ editorOpen }
					onUpdate={ this.toggleTicketManager }
					calculator={ calculator }
				/>
				<TicketPriceCalculatorFormModal
					ticket={ this.state.newTicket }
					toggleEditor={ toggleCalculator }
					editorOpen={ showCalculator }
				/>
				<TicketAssignmentsManagerModal
					ticket={ this.state.newTicket }
					allDates={ allDates }
					toggleEditor={ toggleTicketAssignments }
					editorOpen={ showTicketAssignments }
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

export default compose( [
	withPriceTypes,
	withEditor,
	withTicketPriceCalculator,
	withTicketAssignmentsManager,
	PaginatedTicketsListWithFilterBar,
] )( EditorTicketsList );
