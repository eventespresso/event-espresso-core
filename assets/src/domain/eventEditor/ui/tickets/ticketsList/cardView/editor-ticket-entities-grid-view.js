/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import EditorTicketEntityGridItem from './editor-ticket-entity-grid-item';
import useTicketsRegistrationCount from '../../../../../../../ZZZ/editor/events/tickets/editor-ticket/use-tickets-registration-count';
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
const EditorTicketEntitiesGridView = ({ entities, htmlClass, ...otherProps }) => {
	const classes = htmlClass ? `${htmlClass} ee-tickets-list-grid-view` : 'ee-tickets-list-list-view';
	const registrationCounts = useTicketsRegistrationCount();
	return (
		<div className={classes}>
			{entities.map(function(ticketEntity) {
				return isModelEntityOfModel(ticketEntity, 'ticket') ? (
					<EditorTicketEntityGridItem
						key={ticketEntity.id}
						ticketEntity={ticketEntity}
						registrationCount={registrationCounts[ticketEntity.id] || 0}
						{...otherProps}
					/>
				) : null;
			})}
		</div>
	);
};

EditorTicketEntitiesGridView.propTypes = {
	entities: PropTypes.array.isRequired,
	htmlClass: PropTypes.string,
};

EditorTicketEntitiesGridView.defaultProps = {
	entities: [],
	htmlClass: '',
};

export default EditorTicketEntitiesGridView;
