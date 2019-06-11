/**
 * External imports
 */
import PropTypes from 'prop-types';
import { Component, Fragment } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @param {Function} onShowFilterChange
 * @param {Function} onOrderFilterChange
 * @param {Function} onDisplayFilterChange
 * @return {Object} EditorDatesListView with added DateListFilters
 */
class DateListFilterBar extends Component {
	static propTypes = {
		showDates: PropTypes.string.isRequired,
		datesSortedBy: PropTypes.string.isRequired,
		displayDates: PropTypes.string.isRequired,
		setShowDates: PropTypes.func.isRequired,
		setDatesSortedBy: PropTypes.func.isRequired,
		setDisplayDates: PropTypes.func.isRequired,
	};

	/**
	 * @param {string} showDates
	 * @param {Function} setShowDates
	 * @return {Object} rendered showDates filter
	 */
	showDates = ( showDates, setShowDates ) => {
		return (
			<SelectControl
				label={ __( 'show', 'event_espresso' ) }
				className="espresso-date-list-filter-bar-show-select"
				value={ showDates }
				options={ [
					{
						value: 'all',
						label: __( 'all dates', 'event_espresso' ),
					},
					{
						value: 'active-upcoming',
						label: __(
							'all active and upcoming',
							'event_espresso'
						),
					},
					{
						value: 'active-only',
						label: __(
							'active dates only',
							'event_espresso'
						),
					},
					{
						value: 'upcoming-only',
						label: __(
							'upcoming dates only',
							'event_espresso'
						),
					},
					{
						value: 'next-active-upcoming-only',
						label: __(
							'next active or upcoming only',
							'event_espresso'
						),
					},
					{
						value: 'sold-out-only',
						label: __( 'sold out dates only', 'event_espresso' ),
					},
					{
						value: 'above-90-capacity',
						label: __(
							'dates above 90% capacity',
							'event_espresso'
						),
					},
					{
						value: 'above-75-capacity',
						label: __(
							'dates above 75% capacity',
							'event_espresso'
						),
					},
					{
						value: 'above-50-capacity',
						label: __(
							'dates above 50% capacity',
							'event_espresso'
						),
					},
					{
						value: 'below-50-capacity',
						label: __(
							'dates below 50% capacity',
							'event_espresso'
						),
					},
					{
						value: 'recently-expired-only',
						label: __(
							'recently expired dates',
							'event_espresso'
						),
					},
					{
						value: 'expired-only',
						label: __(
							'all expired dates',
							'event_espresso'
						),
					},
					{
						value: 'trashed-only',
						label: __(
							'trashed dates only',
							'event_espresso'
						),
					},
				] }
				onChange={ setShowDates }
			/>
		);
	};

	/**
	 * @param {string} datesSortedBy
	 * @param {Function} setDatesSortedBy
	 * @return {Object} rendered datesSortedBy filter
	 */
	datesSortedBy = ( datesSortedBy, setDatesSortedBy ) => {
		return (
			<SelectControl
				label={ __( 'sort', 'event_espresso' ) }
				className="espresso-date-list-filter-bar-order-select"
				value={ datesSortedBy }
				options={ [
					{
						value: 'chronologically',
						label: __( 'chronologically',
							'event_espresso'
						),
					},
					{
						value: 'by-name',
						label: __( 'by date name', 'event_espresso' ),
					},
					{
						value: 'by-id',
						label: __( 'by date ID', 'event_espresso' ),
					},
					{
						value: 'by-order',
						label: __( 'by custom order',
							'event_espresso'
						),
					},
				] }
				onChange={ setDatesSortedBy }
			/>
		);
	};

	/**
	 * @param {string} displayDates
	 * @param {Function} setDisplayDates
	 * @return {Object} rendered displayDates filter
	 */
	displayDates = ( displayDates, setDisplayDates ) => {
		return (
			<SelectControl
				label={ __( 'display', 'event_espresso' ) }
				className="espresso-date-list-filter-bar-display-select"
				value={ displayDates }
				options={ [
					{
						value: 'start',
						label: __( 'start dates only',
							'event_espresso'
						),
					},
					{
						value: 'end',
						label: __( 'end dates only', 'event_espresso' ),
					},
					{
						value: 'both',
						label: __( 'start and end dates',
							'event_espresso'
						),
					},
				] }
				onChange={ setDisplayDates }
			/>
		);
	};

	render() {
		const {
			showDates,
			datesSortedBy,
			displayDates,
			setShowDates,
			setDatesSortedBy,
			setDisplayDates,
		} = this.props;
		const showFilter = (
			<div className="ee-show-dates-filter ee-filter-bar-filter">
				{ this.showDates( showDates, setShowDates ) }
			</div>
		);
		const sortFilter = (
			<div className="ee-sort-dates-filter ee-filter-bar-filter">
				{ this.datesSortedBy( datesSortedBy, setDatesSortedBy ) }
			</div>
		);
		const displayFilter = (
			<div className="ee-display-dates-dates-filter ee-filter-bar-filter">
				{ this.displayDates( displayDates, setDisplayDates ) }
			</div>
		);
		return (
			<Fragment>
				{ showFilter }
				{ sortFilter }
				{ displayFilter }
			</Fragment>
		);
	}
}

export default DateListFilterBar;
