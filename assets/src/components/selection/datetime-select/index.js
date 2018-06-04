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
import { datetimeSelectOptions } from './options';

const nowDateAndTime = moment();

/**
 * DatetimeSelect component.
 * A react component for an datetime selector.
 *
 * @param {Array} datetimes  An empty array or array of Datetime Entities. See
 *                          prop-types for shape.
 * @param {function} onDatetimeSelect  The callback on selection of datetime.
 * @param {string} selectLabel The label for the select input.
 * @param {number} selectedDatetimeId  If provided, the id of the datetime to
 *   pre-select.
 * @param {boolean} isLoading  Whether or not the selector should start in a
 *                               loading state
 * @return {Function}  A pure component function.
 * @constructor
 */
export const DatetimeSelect = ( {
	datetimes,
	onDatetimeSelect,
	selectLabel,
	selectedDatetimeId,
	isLoading,
} ) => {
	if ( isEmpty( datetimes ) ) {
		return (
			<Fragment>
				<Placeholder
					icon="calendar"
					label={ __( 'DatetimeSelect', 'event_espresso' ) }
				>
					{ !isLoading ?
						__(
							'There are no datetimes to select from. You need' +
							' to create a datetime first.',
							'event_espresso',
						) :
						<Spinner/>
					}
				</Placeholder>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<SelectControl
				label={ selectLabel }
				value={ selectedDatetimeId }
				options={ datetimeSelectOptions( datetimes ) }
				onChange={ ( value ) => onDatetimeSelect( value ) }
			/>
		</Fragment>
	);
};

/**
 * @todo some of these proptypes are likely reusable in various place so we may
 * want to consider extracting them into a separate file/object that can be
 * included as needed.
 */
DatetimeSelect.propTypes = {
	datetimes: PropTypes.arrayOf( PropTypes.shape( {
		DTT_ID: PropTypes.number.isRequired,
		DTT_name: PropTypes.string.isRequired,
	} ) ),
	onDatetimeSelect: PropTypes.func,
	selectLabel: PropTypes.string,
	selectedDatetimeId: PropTypes.number,
	isLoading: PropTypes.bool,
	attributes: PropTypes.shape( {
		limit: PropTypes.number,
		orderBy: PropTypes.oneOf( [
			'DTT_name',
			'DTT_ID',
			'start_date',
			'end_date',
		] ),
		order: PropTypes.oneOf( [ 'asc', 'desc' ] ),
		showExpired: PropTypes.bool,
		month: PropTypes.month,
	} ),
};

DatetimeSelect.defaultProps = {
	attributes: {
		limit: 20,
		orderBy: 'start_date',
		order: 'desc',
		showExpired: false,
	},
	selectLabel: __( 'Select Datetime', 'event_espresso' ),
	isLoading: true,
	selectedDatetimeId: 0,
	datetimes: [],
};

/**
 * Used to map an orderBy string to the actual value used in a REST query from
 * the context of an datetime.
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
		start_date: 'DTT_EVT_start',
		end_date: 'DTT_EVT_end'
	};
	return isUndefined( orderByMap[ orderBy ] ) ?
		orderBy :
		orderByMap[ orderBy ];
};

/**
 * Builds where conditions for an datetimes endpoint request using provided
 * information.
 *
 * @param {boolean} showExpired  Whether or not to include expired datetimes.
 * @param {string} month         Return datetimes for the given month.  Can be any
 *                                 in any month format recognized by moment.
 * @return {string}             The assembled where conditions.
 */
const whereConditions = ( { showExpired = true, month = 'none' } ) => {
	const where = [];
	const GREATER_AND_EQUAL = encodeURIComponent( '>=' );
	const LESS_AND_EQUAL = encodeURIComponent( '<=' );

	if ( !showExpired ) {
		where.push( 'where[DTT_EVT_end**expired][]=>&where[DTT_EVT_end**expired][]=' +
			nowDateAndTime.local().format() );
	}
	if ( month && month !== 'none' ) {
		where.push( 'where[DTT_EVT_start][]=' +
			GREATER_AND_EQUAL +
			'&where[DTT_EVT_start][]=' +
			moment().month( month ).startOf( 'month' ).local().format() );
		where.push( 'where[DTT_EVT_end][]=' +
			LESS_AND_EQUAL +
			'&where[DTT_EVT_end][]=' +
			moment().month( month ).endOf( 'month' ).local().format() );
	}
	return where.join( '&' );
};

/**
 * The DatetimeSelect Component wrapped in the `withSelect` higher order component.
 * This subscribes the DatetimeSelect component to the state maintained via the
 * eventespresso/lists store.
 */
export default withSelect( ( select, ownProps ) => {
	const { attributes = DatetimeSelect.defaultProps.attributes } = ownProps;
	const { limit, order, orderBy } = attributes;
	const where = whereConditions( attributes );
	const { getDatetimes, isRequestingDatetimes } = select( 'eventespresso/lists' );
	const queryArgs = {
		limit,
		order,
		order_by: mapOrderBy( orderBy ),
	};
	let queryString = stringify( pickBy( queryArgs,
		value => !isUndefined( value ),
	) );

	if ( where ) {
		queryString += '&' + where;
	}
	return {
		datetimes: getDatetimes( queryString ),
		isLoading: isRequestingDatetimes( queryString ),
	};
} )( DatetimeSelect );
