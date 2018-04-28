/**
 * External dependencies
 */
import { stringify } from 'querystringify';
import moment from 'moment';
import { isUndefined, pickBy, isEmpty } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WP dependencies
 */
import { Placeholder, SelectControl, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { buildEventOptions } from './build-event-options';

const nowDateAndTime = moment();

export const EventSelect = ( {
	events,
	onEventSelect,
	selectLabel,
	selectedEventId,
	isLoading,
} ) => {
	if ( isLoading || isEmpty( events ) ) {
		return <Placeholder key="placeholder"
			icon="calendar"
			label={ __( 'EventSelect', 'event_espresso' ) }
		>
			{ isLoading ?
				<Spinner /> :
				__(
					'There are no events to select from. You need to create an event first.',
					'event_espresso'
				)
			}
		</Placeholder>;
	}

	return <SelectControl
		label={ selectLabel }
		value={ selectedEventId }
		options={ buildEventOptions( events ) }
		onChange={ ( value ) => onEventSelect( value ) }
	/>;
}

/**
 * @todo some of these proptypes are likely reusable in various place so we may
 * want to consider extracting them into a separate file/object that can be
 * included as needed.
 * @type {{events: *, onEventSelect, selectLabel: *, selectedEventId: *,
 *   isLoading: *, attributes: {limit: *, orderBy: *, order: *, showExpired: *,
 *   categorySlug: *, month: *}}}
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
 * 					  the provided alias
 */
const mapOrderBy = ( orderBy ) => {
	const orderByMap = {
		start_date: 'Datetime.DTT_EVT_start',
		end_date: 'Datetime.DTT_EVT_end',
		ticket_start: 'Datetime.Ticket.TKT_start_date',
		ticket_end: 'Datetime.Ticket.TKT_end_date',
	};
	return isUndefined( orderByMap[ orderBy ] ) ? orderBy : orderByMap[ orderBy ];
};

const whereConditions = ( { showExpired, categorySlug, month } ) => {
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
		where.push( 'where[Datetime.DTT_EVT_start][]=' + GREATER_AND_EQUAL + '&where[Datetime.DTT_EVT_start][]=' +
			moment().month( month ).startOf( 'month' ).local().format() );
		where.push( 'where[Datetime.DTT_EVT_end][]=' + LESS_AND_EQUAL + '&where[Datetime.DTT_EVT_end][]=' +
			moment().month( month ).endOf( 'month' ).local().format() );
	}
	return where.join( '&' );
};

export default withSelect( ( select, ownProps ) => {
	const { limit, order, orderBy } = ownProps.attributes;
	const where = whereConditions( ownProps.attributes );
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
