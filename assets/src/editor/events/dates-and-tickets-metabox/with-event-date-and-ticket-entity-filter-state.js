/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { compose, createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import '../../editor.css';
import {
	withDatesListFilterState,
	withFilteredDateEntities,
} from '../dates-and-times/editor-date/filter-bar';
import {
	withTicketEntitiesListFilterState,
	withFilteredTicketEntities,
} from '../tickets/editor-ticket/filter-bar';
import { withEventEntity, withEventDateEntities } from '../events/data';
import { withTicketEntitiesForAllDateEntities } from '../dates-and-times/data';
import withTicketEntitiesForFilteredDateEntities
	from './with-ticket-entities-for-filtered-date-entities';

const withEventDateAndTicketEntityFilterState = createHigherOrderComponent(
	compose( [
		withEventEntity,
		withEventDateEntities,
		withTicketEntitiesForAllDateEntities,
		withDatesListFilterState,
		withTicketEntitiesListFilterState,
		withFilteredDateEntities,
		withTicketEntitiesForFilteredDateEntities,
		withFilteredTicketEntities,
	] ),
	'withDatesAndTicketsFilterState'
);

withEventDateAndTicketEntityFilterState.propTypes = {
	eventId: PropTypes.oneOfType( [
		PropTypes.number,
		PropTypes.string,
	] ).isRequired,
};

export default withEventDateAndTicketEntityFilterState;
