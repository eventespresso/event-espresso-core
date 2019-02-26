/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component, Fragment } from '@wordpress/element';
import { IconButton, SelectControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * TicketsListFilterBar
 * filters for controlling the display of a list of Tickets
 *
 * @param {Function} onShowFilterChange
 * @param {Function} onOrderFilterChange
 * @param {Function} onDisplayFilterChange
 * @return {Object} EditorTicketsListView with added TicketListFilters
 */
class TicketsListFilterBar extends Component {
	static propTypes = {
		showTickets: PropTypes.string.isRequired,
		sortTickets: PropTypes.string.isRequired,
		displayTicketDate: PropTypes.string.isRequired,
		isChained: PropTypes.bool.isRequired,
		setShowTickets: PropTypes.func.isRequired,
		setSortTickets: PropTypes.func.isRequired,
		setDisplayTicketDate: PropTypes.func.isRequired,
		setIsChained: PropTypes.func.isRequired,
	};

	/**
	 * @param {string} showTickets
	 * @param {Function} setShowTickets
	 * @param {boolean} isChained
	 * @return {Object} rendered showTickets filter
	 */
	showTickets = ( showTickets, setShowTickets, isChained ) => {
		return (
			<SelectControl
				label={ __( 'show', 'event_espresso' ) }
				className="espresso-ticket-list-filter-bar-show-select"
				value={ showTickets }
				options={ [
					{
						value: 'all',
						label: isChained ?
							__( 'all tickets for above dates',
								'event_espresso'
							) :
							__( 'all tickets for all dates', 'event_espresso' ),
					},
					{
						value: 'on-sale-and-pending',
						label: __(
							'all on sale and sale pending',
							'event_espresso'
						),
					},
					{
						value: 'on-sale-only',
						label: __(
							'on sale tickets only',
							'event_espresso'
						),
					},
					{
						value: 'pending-only',
						label: __(
							'sale pending tickets only',
							'event_espresso'
						),
					},
					{
						value: 'next-on-sale-or-pending-only',
						label: __(
							'next on sale or sale pending only',
							'event_espresso'
						),
					},
					{
						value: 'sold-out-only',
						label: __( 'sold out tickets only', 'event_espresso' ),
					},
					{
						value: 'above-90-sold',
						label: __( '90% available tickets sold',
							'event_espresso'
						),
					},
					{
						value: 'above-75-sold',
						label: __( '75% available tickets sold ',
							'event_espresso'
						),
					},
					{
						value: 'above-50-sold',
						label: __( '50% available tickets sold',
							'event_espresso'
						),
					},
					{
						value: 'below-50-sold',
						label: __( 'less than 50% available tickets sold',
							'event_espresso'
						),
					},
					{
						value: 'expired-only',
						label: __( 'expired tickets only',
							'event_espresso'
						),
					},
				] }
				onChange={ setShowTickets }
			/>
		);
	};

	/**
	 * @param {string} sortTickets
	 * @param {Function} setSortTickets
	 * @return {Object} rendered sortTickets filter
	 */
	sortTickets = ( sortTickets, setSortTickets ) => {
		return (
			<SelectControl
				label={ __( 'sort', 'event_espresso' ) }
				className="espresso-ticket-list-filter-bar-order-select"
				value={ sortTickets }
				options={ [
					{
						value: 'chronologically',
						label: __( 'chronologically',
							'event_espresso'
						),
					},
					{
						value: 'by-name',
						label: __( 'by ticket name', 'event_espresso' ),
					},
					{
						value: 'by-id',
						label: __( 'by ticket ID', 'event_espresso' ),
					},
					{
						value: 'by-order',
						label: __( 'by custom order',
							'event_espresso'
						),
					},
				] }
				onChange={ setSortTickets }
			/>
		);
	};

	/**
	 * @param {string} displayTickets
	 * @param {Function} setDisplayTickets
	 * @return {Object} rendered displayTickets filter
	 */
	displayTickets = ( displayTickets, setDisplayTickets ) => {
		return (
			<SelectControl
				label={ __( 'display', 'event_espresso' ) }
				className="espresso-ticket-list-filter-bar-display-select"
				value={ displayTickets }
				options={ [
					{
						value: 'start',
						label: __( 'ticket sales start date only',
							'event_espresso'
						),
					},
					{
						value: 'end',
						label: __(
							'ticket sales end date only',
							'event_espresso'
						),
					},
					{
						value: 'both',
						label: __(
							'ticket sales start and end dates',
							'event_espresso'
						),
					},
				] }
				onChange={ setDisplayTickets }
			/>
		);
	};

	/**
	 * @param {boolean} isChained
	 * @param {Function} setIsChained
	 * @return {Object} rendered displayTickets filter
	 */
	ticketsChained = ( isChained, setIsChained ) => {
		isChained = !! isChained;
		return (
			<IconButton
				label={ isChained ?
					__( 'showing tickets for above dates only', 'event_espresso' ) :
					__( 'showing tickets for all event dates', 'event_espresso' )
				}
				icon={ isChained ? 'admin-links' : 'editor-unlink' }
				onClick={ () => setIsChained( ! isChained ) }
				value={ isChained }
			/>
		);
	};

	render() {
		const {
			showTickets,
			setShowTickets,
			sortTickets,
			setSortTickets,
			displayTicketDate,
			setDisplayTicketDate,
			isChained,
			setIsChained,
		} = this.props;
		const showFilter = (
			<div className="ee-show-tickets-filter ee-filter-bar-filter">
				{ this.showTickets( showTickets, setShowTickets, isChained ) }
			</div>
		);
		const sortFilter = (
			<div className="ee-sort-tickets-filter ee-filter-bar-filter">
				{ this.sortTickets( sortTickets, setSortTickets ) }
			</div>
		);
		const displayFilter = (
			<div className="ee-display-ticket-dates-filter ee-filter-bar-filter">
				{
					this.displayTickets(
						displayTicketDate,
						setDisplayTicketDate
					)
				}
			</div>
		);
		const isChainedFilter = (
			<div
				className="ee-ticket-dates-chained-filter ee-filter-bar-filter">
				{
					this.ticketsChained(
						isChained,
						setIsChained
					)
				}
			</div>
		);
		return (
			<Fragment>
				{ showFilter }
				{ isChainedFilter }
				{ sortFilter }
				{ displayFilter }
			</Fragment>
		);
	}
}

export default TicketsListFilterBar;
