/**
 * Internal dependencies
 */
import { default as EditorTicketGridItem } from './editor-ticket-grid-item';
import './editor-tickets-grid-view.css';

/**
 * EditorTicketsGridView
 * Displays tickets as mobile/finger friendly blocks
 * with the most relevant info visible
 *
 * @function
 * @param {Array} entities    array of JSON objects defining the Tickets
 * @param {string} htmlClass
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Tickets
 */
export const EditorTicketsGridView = ( {
	entities,
	htmlClass,
	...otherProps
} ) => {
	// console.log( '' );
	// console.log( 'EditorTicketsGridView otherProps', otherProps );
	htmlClass = htmlClass ?
		`${ htmlClass } ee-tickets-list-grid-view` :
		'ee-tickets-list-list-view';
	return (
		<div className={ htmlClass }>
			{
				entities.map(
					function( ticket ) {
						return (
							<EditorTicketGridItem
								key={ ticket.id }
								ticket={ ticket }
								{ ...otherProps }
							/>
						);
					}
				)
			}
		</div>
	);
};
