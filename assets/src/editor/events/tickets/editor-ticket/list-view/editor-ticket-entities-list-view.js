/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import EditorTicketEntityListItem from './editor-ticket-entity-list-item';
import './editor-ticket-entities-list-view.css';

/**
 * EditorTicketsListView
 * Displays tickets in a standard list table like view
 *
 * @function
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} htmlClass
 * @param {mixed} otherProps
 * @return {Component} 			list of rendered Event Dates
 */
const EditorTicketEntitiesListView = ( {
	entities,
	htmlClass,
	...otherProps
} ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-tickets-list-list-view` :
		'ee-tickets-list-list-view';

	return (
		<div className={ htmlClass }>
			<div key={ 0 } className="ee-editor-ticket-list-items">
				<div className="ee-ticket-list-item"></div>
				<div className="ee-ticket-list-item">
					{ __( 'ID', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Name', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Price', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Goes on Sale', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Sold', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Reserved', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Capacity', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Registrants', 'event_espresso' ) }
				</div>
				<div className="ee-ticket-list-item">
					{ __( 'Actions', 'event_espresso' ) }
				</div>
			</div>
			{
				entities.map(
					function( ticketEntity ) {
						return (
							<EditorTicketEntityListItem
								key={ ticketEntity.id }
								ticketEntity={ ticketEntity }
								{ ...otherProps }
							/>
						);
					}
				)
			}
		</div>
	);
};

export default EditorTicketEntitiesListView;
