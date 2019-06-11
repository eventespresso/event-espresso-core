/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import EditorTicketEntityGridItem from './editor-ticket-entity-grid-item';
import './editor-ticket-entities-grid-view.css';

/**
 * EditorTicketEntitiesGridView
 * Displays tickets as mobile/finger friendly blocks
 * with the most relevant info visible
 *
 * @function
 * @param {Array} entities    array of JSON objects defining the Tickets
 * @param {string} htmlClass
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Tickets
 */
const EditorTicketEntitiesGridView = ( {
	entities,
	htmlClass,
	...otherProps
} ) => {
	htmlClass = htmlClass ?
		`${ htmlClass } ee-tickets-list-grid-view` :
		'ee-tickets-list-list-view';
	return (
		<div className={ htmlClass }>
			{
				entities.map(
					function( ticketEntity ) {
						return isModelEntityOfModel( ticketEntity, 'ticket' ) ? (
							<EditorTicketEntityGridItem
								key={ ticketEntity.id }
								ticketEntity={ ticketEntity }
								{ ...otherProps }
							/>
						) : null;
					}
				)
			}
		</div>
	);
};

export default EditorTicketEntitiesGridView;
