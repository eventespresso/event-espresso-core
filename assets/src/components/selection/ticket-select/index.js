/**
 * External dependencies
 */
import { stringify } from 'querystringify';
import moment from 'moment';
import { isUndefined, pickBy, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';

/**
 * WordPress dependencies
 */
import { Placeholder, SelectControl, Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { ticketSelectOptions } from './options';

const nowDateAndTime = moment();

/**
 * TicketSelect component.
 * Generates a ticket select input.
 *
 * @param {Array} tickets            An empty array or array of Ticket
 *                                   Entities. See prop-types for shape.
 * @param {function} onTicketSelect  The callback on selection of ticket.
 * @param {string} selectLabel       The label for the select input.
 * @param {number} selectedTicketId  The ID of the ticket to pre-select.
 * @param {number} forEventId        ID for Event to retrieve tickets from
 * @param {number} forDatetimeId     ID for Datetime to retrieve tickets from
 * @param {boolean} isLoading        Whether or not the selector should
 *                                   start in a loading state
 * @return {Function}                A pure component function.
 * @constructor
 */
class TicketSelect extends Component {
	placeHolder() {
		const { isLoading, selectLabel } = this.props;
		return (
			<Fragment>
				<Placeholder
					icon="calendar"
					label={ selectLabel }
				>
					{ ! isLoading ?
						__(
							'There are no tickets to select from. You need' +
							' to create a ticket first.',
							'event_espresso',
						) :
						<Spinner />
					}
				</Placeholder>
			</Fragment>
		);
	}

	render() {
		const {
			tickets,
			selectLabel,
			selectedTicketId,
			onTicketSelect,
			addAllOption,
			addAllOptionLabel,
		} = this.props;
		if ( isEmpty( tickets ) ) {
			return this.placeHolder();
		}
		return (
			<Fragment>
				<SelectControl
					label={ selectLabel }
					value={ selectedTicketId }
					options={
						ticketSelectOptions(
							tickets,
							addAllOption,
							addAllOptionLabel,
						)
					}
					onChange={ onTicketSelect }
				/>
			</Fragment>
		);
	}
}

/**
 * @todo some of these proptypes are likely reusable in various place so we may
 * want to consider extracting them into a separate file/object that can be
 * included as needed.
 */
TicketSelect.propTypes = {
	tickets: PropTypes.arrayOf( PropTypes.shape( {
		TKT_ID: PropTypes.number.isRequired,
		TKT_name: PropTypes.string.isRequired,
	} ) ),
	onTicketSelect: PropTypes.func,
	selectLabel: PropTypes.string,
	selectedTicketId: PropTypes.number,
	forEventId: PropTypes.number,
	forDatetimeId: PropTypes.number,
	isLoading: PropTypes.bool,
	addAllOption: PropTypes.bool,
	addAllOptionLabel: PropTypes.string,
	attributes: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( [
			'TKT_name',
			'TKT_ID',
			'start_date',
			'end_date',
		] ),
		order: PropTypes.oneOf( [ 'asc', 'desc' ] ),
		showExpired: PropTypes.bool,
		month: PropTypes.month,
	} ),
};

TicketSelect.defaultProps = {
	tickets: [],
	selectLabel: __( 'Select Ticket', 'event_espresso' ),
	selectedTicketId: 0,
	forEventId: 0,
	forDatetimeId: 0,
	isLoading: true,
	addAllOption: true,
	addAllOptionLabel: __( 'All Tickets', 'event_espresso' ),
	attributes: {
		limit: 20,
		orderBy: 'start_date',
		order: 'desc',
		showExpired: false,
	},
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an ticket.
 * @todo this should be moved to a mapper library for various EE Rest Related
 * things maybe?
 *
 * @param {string} orderBy
 *
 * @return { string } Returns an actual orderBy string for the REST query for
 *                      the provided alias
 */
const mapOrderBy = ( orderBy ) => {
	const orderByMap = {
		start_date: 'TKT_start_date',
		end_date: 'TKT_end_date',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an tickets endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired 	Whether or not to include expired tickets.
 * @param {string} month        	Return tickets for the given month. Can be
 *                              	any in any month format recognized by moment
 * @param {number} forEventId   	ID for Event to retrieve tickets from
 * @param {number} forDatetimeId 	ID for Event to retrieve tickets from
 * @return {string}             	The assembled where conditions.
 */
const whereConditions = ( {
	forEventId = 0,
	forDatetimeId = 0,
	showExpired = false,
	month = 'none',
} ) => {
	const where = [];
	const GREATER_AND_EQUAL = encodeURIComponent( '>=' );
	const LESS_AND_EQUAL = encodeURIComponent( '<=' );

	if ( ! showExpired ) {
		where.push(
			'where[TKT_end_date**expired][]=>' +
			'&where[TKT_end_date**expired][]=' +
			nowDateAndTime.local().format()
		);
	}
	if ( month && month !== 'none' ) {
		where.push(
			'where[TKT_start_date][]=' + GREATER_AND_EQUAL +
			'&where[TKT_start_date][]=' +
			moment().month( month ).startOf( 'month' ).local().format()
		);
		where.push(
			'where[TKT_end_date][]=' + LESS_AND_EQUAL +
			'&where[TKT_end_date][]=' +
			moment().month( month ).endOf( 'month' ).local().format()
		);
	}
	forEventId = parseInt( forEventId );
	if ( forEventId !== 0 && ! isNaN( forEventId ) ) {
		where.push( 'where[Datetime.Event.EVT_ID]=' + forEventId );
	}
	forDatetimeId = parseInt( forDatetimeId );
	if ( forDatetimeId !== 0 && ! isNaN( forDatetimeId ) ) {
		where.push( 'where[Datetime.DTT_ID]=' + forDatetimeId );
	}
	return where.join( '&' );
};

/**
 * The TicketSelect Component wrapped in the `withSelect` higher order
 * component. This subscribes the TicketSelect component to the state
 * maintained via the eventespresso/lists store.
 */
export default withSelect( ( select, ownProps ) => {
	const { attributes = TicketSelect.defaultProps.attributes } = ownProps;
	const {
		selectedTicketId,
		forEventId,
		forDatetimeId,
		addAllOption,
		addAllOptionLabel,
	} = ownProps;
	attributes.forEventId = forEventId;
	attributes.forDatetimeId = forDatetimeId;
	const { limit, order, orderBy } = attributes;
	const where = whereConditions( attributes );
	const {
		getTickets,
		isRequestingTickets,
	} = select( 'eventespresso/lists' );
	const queryArgs = {
		limit,
		order,
		order_by: mapOrderBy( orderBy ),
	};
	let queryString = stringify( pickBy( queryArgs,
		value => ! isUndefined( value ),
	) );
	if ( where ) {
		queryString += '&' + where;
	}
	return {
		tickets: getTickets( queryString ),
		isLoading: isRequestingTickets( queryString ),
		selectedTicketId: selectedTicketId,
		forEventId: forEventId,
		forDatetimeId: forDatetimeId,
		addAllOption: addAllOption,
		addAllOptionLabel: addAllOptionLabel,
	};
} )( TicketSelect );
