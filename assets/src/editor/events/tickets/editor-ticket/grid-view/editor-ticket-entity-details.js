/**
 * External imports
 */
import PropTypes from 'prop-types';
import { ifValidTicketEntity } from '@eventespresso/editor-hocs';

/**
 * Internal dependencies
 */
import InlineEditTicketName from './inline-edit-ticket-name';
import InlineEditTicketDescription from './inline-edit-ticket-description';
import InlineEditTicketPrice from './inline-edit-ticket-price';
import TicketDetailsPanel from './ticket-details-panel';

/**
 * EditorTicketEntityDetails
 *
 * @function
 * @param {Object} eventTicket    model object defining the Event Ticket
 * @return {string}    ticket details
 */
const EditorTicketEntityDetails = ( {
	ticketEntity,
	registrationCount,
	showDesc,
	showPrice,
} ) => (
	<div className={ 'ee-editor-ticket-details-wrapper-div' }>
		<InlineEditTicketName ticket={ ticketEntity } />
		<InlineEditTicketPrice
			ticket={ ticketEntity }
			showPrice={ showPrice }
		/>
		<InlineEditTicketDescription
			ticket={ ticketEntity }
			showDesc={ showDesc }
		/>
		<TicketDetailsPanel ticket={ ticketEntity } registrationCount={ registrationCount } />
	</div>
);

EditorTicketEntityDetails.propTypes = {
	ticketEntity: PropTypes.object.isRequired,
	registrationCount: PropTypes.number,
	showDesc: PropTypes.string,
	showPrice: PropTypes.bool,
};

EditorTicketEntityDetails.defaultProps = {
	showDesc: 'excerpt',
	showPrice: true,
};

export default ifValidTicketEntity( EditorTicketEntityDetails );
