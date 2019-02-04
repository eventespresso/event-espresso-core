/**
 * Internal dependencies
 */
import { EditorTicketGridItem } from './';
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
const EditorTicketsGridView = ( {
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

export default EditorTicketsGridView;
