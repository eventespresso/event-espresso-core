/**
 * External dependencies
 */
import { stringify } from 'querystringify';
import moment from 'moment';
import { isUndefined, pickBy, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { __ } from '@eventespresso/i18n';

/**
 * WP dependencies
 */
import { Placeholder, SelectControl, Spinner } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { buildEventOptions } from './build-event-options';

const nowDateAndTime = moment();

/**
 * EventSelect component.
 * A react component for an event selector.
 *
 * @param {Array} events  An empty array or array of Event Entities. See
 *                          prop-types for shape.
 * @param {function} onEventSelect  The callback on selection of event.
 * @param {string} selectLabel The label for the select input.
 * @param {number} selectedEventId  If provided, the id of the event to
 *   pre-select.
 * @param {boolean} isLoading  Whether or not the selector should start in a
 *                               loading state
 * @return {Function}  A pure component function.
 * @constructor
 */
export const EventSelect = ( {
	events,
	onEventSelect,
	selectLabel,
	selectedEventId,
	isLoading,
} ) => {
	if ( isEmpty( events ) ) {
		return (
			<Fragment>
				<Placeholder
					icon="calendar"
					label={ __( 'EventSelect', 'event_espresso' ) }
				>
					{ ! isLoading && isEmpty( events ) ?
						__(
							'There are no events to select from. You need to create an event first.',
							'event_espresso',
						) :
						<Spinner />
					}
				</Placeholder>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<SelectControl
				label={ selectLabel }
				value={ selectedEventId }
				options={ buildEventOptions( events ) }
				onChange={ ( value ) => onEventSelect( value ) }
			/>
		</Fragment>
	);
};

/**
 * @todo some of these proptypes are likely reusable in various place so we may
 * want to consider extracting them into a separate file/object that can be
 * included as needed.
 */
EventSelect.propTypes = {
	events: PropTypes.arrayOf( PropTypes.shape( {
		EVT_name: PropTypes.string.required,
		EVT_ID: PropTypes.number.required,
	} ) ),
	onEventSelect: PropTypes.func,
	selectLabel: PropTypes.string,
	selectedEventId: PropTypes.number,
	isLoading: PropTypes.bool,
	attributes: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( [
			'EVT_name',
			'EVT_ID',
			'start_date',
			'end_date',
			'ticket_start',
			'ticket_end',
		] ),
		order: PropTypes.oneOf( [ 'asc', 'desc' ] ),
		showExpired: PropTypes.bool,
		categorySlug: PropTypes.string,
		month: PropTypes.month,
	} ),
};

EventSelect.defaultProps = {
	attributes: {
		limit: 20,
		orderBy: 'start_date',
		order: 'desc',
		showExpired: false,
	},
	selectLabel: __( 'Select Event', 'event_espresso' ),
	isLoading: true,
	selectedEventId: 0,
	events: [],
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an event.
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
		start_date: 'Datetime.DTT_EVT_start',
		end_date: 'Datetime.DTT_EVT_end',
		ticket_start: 'Datetime.Ticket.TKT_start_date',
		ticket_end: 'Datetime.Ticket.TKT_end_date',
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an events endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired  Whether or not to include expired events.
 * @param {string} categorySlug  Return events for the given categorySlug
 * @param {string} month         Return events for the given month.  Can be any
 *                                 in any month format recognized by moment.
 * @return {string}             The assembled where conditions.
 */
const whereConditions = ( { showExpired = true, categorySlug = null, month = 'none' } ) => {
	const where = [];
	const GREATER_AND_EQUAL = encodeURIComponent( '>=' );
	const LESS_AND_EQUAL = encodeURIComponent( '<=' );

	if ( ! showExpired ) {
		where.push( 'where[Datetime.DTT_EVT_end**expired][]=>&where[Datetime.DTT_EVT_end**expired][]=' +
			nowDateAndTime.local().format() );
	}
	if ( categorySlug ) {
		where.push( 'where[Term_Relationship.Term_Taxonomy.Term.slug]=' + categorySlug );
	}
	if ( month && month !== 'none' ) {
		where.push( 'where[Datetime.DTT_EVT_start][]=' +
			GREATER_AND_EQUAL +
			'&where[Datetime.DTT_EVT_start][]=' +
			moment().month( month ).startOf( 'month' ).local().format() );
		where.push( 'where[Datetime.DTT_EVT_end][]=' +
			LESS_AND_EQUAL +
			'&where[Datetime.DTT_EVT_end][]=' +
			moment().month( month ).endOf( 'month' ).local().format() );
	}
	return where.join( '&' );
};

/**
 * The EventSelect Component wrapped in the `withSelect` higher order component.
 * This subscribes the EventSelect component to the state maintained via the
 * eventespresso/lists store.
 */
export default withSelect( ( select, ownProps ) => {
	const { attributes = EventSelect.defaultProps.attributes } = ownProps;
	const { limit, order, orderBy } = attributes;
	const where = whereConditions( attributes );
	const { getEvents, isRequestingEvents } = select( 'eventespresso/lists' );
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
		events: getEvents( queryString ),
		isLoading: isRequestingEvents( queryString ),
	};
} )( EventSelect );
