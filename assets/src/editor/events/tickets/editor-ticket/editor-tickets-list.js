/**
 * External dependencies
 */
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
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
	TicketPriceCalculatorMenuItem,
} from './price-calculator';
import { withTicketAssignmentsManagerModal } from '../../ticket-assignments-manager';

const {
	FormWrapper,
	FormSaveCancelButtons,
} = twoColumnAdminFormLayout;

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
		this.state = { newTicket: null };
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
	 * @return {Object} rendered button
	 */
	addNewTicketButton = () => {
		const addTicket = () => this.props.addNewTicket(
			( state ) => this.setState( state ),
			this.props.toggleEditor
		);
		return (
			<FancyButton
				icon="tickets-alt"
				style="wp-default"
				buttonText={ __( 'Add New Ticket', 'event_espresso' ) }
				onClick={ addTicket }
			/>
		);
	};

	render() {
		const {
			entities,
			allDates,
			editorOpen,
			toggleEditor,
			view = 'grid',
			...otherProps
		} = this.props;
		const calculator = <TicketPriceCalculatorMenuItem
			ticket={ this.state.newTicket }
		/>;
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
			</FormWrapper>
		);
	}
}

export default compose( [
	withPriceTypes,
	withEditor,
	withDispatch(
		( dispatch ) => {
			const { createEntity } = dispatch( 'eventespresso/core' );
			const addNewTicket = ( setState, toggleEditor ) => {
				createEntity( 'ticket', {} ).then(
					( newTicket ) => {
						setState( { newTicket } );
						toggleEditor();
					}
				);
			};
			return { addNewTicket };
		}
	),
	PaginatedTicketsListWithFilterBar,
	withTicketAssignmentsManagerModal( () => (
		{
			title: __(
				'Ticket Assignments for All Event Dates',
				'event_espresso'
			),
			closeButtonLabel: null,
		}
	) ),
] )( EditorTicketsList );
