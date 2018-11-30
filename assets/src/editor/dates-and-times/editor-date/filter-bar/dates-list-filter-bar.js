/**
 * External imports
 */
import { Component, Fragment } from 'react';
import { SelectControl } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import PropTypes from 'prop-types';

/**
 * DatesListFilterBar
 * filters for controlling the display of a list of Event Dates
 *
 * @param {Function} onShowFilterChange
 * @param {Function} onOrderFilterChange
 * @param {Function} onDisplayFilterChange
 * @return {Object} EditorDatesListView with added DateListFilters
 */
class DatesListFilterBar extends Component {
	static propTypes = {
		display: PropTypes.string.isRequired,
		show: PropTypes.string.isRequired,
		sort: PropTypes.string.isRequired,
		setDisplay: PropTypes.func.isRequired,
		setShow: PropTypes.func.isRequired,
		setSort: PropTypes.func.isRequired,
	};

	/**
	 * @param {string} show
	 * @param {Function} setShow
	 * @return {Object} rendered show filter
	 */
	show = ( show, setShow ) => {
		return (
			<SelectControl
				label={ __( 'show', 'event_espresso' ) }
				className="espresso-date-list-filter-bar-show-select"
				value={ show }
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
						label: __( 'dates above 90% capacity',
							'event_espresso'
						),
					},
					{
						value: 'above-75-capacity',
						label: __( 'dates above 75% capacity',
							'event_espresso'
						),
					},
					{
						value: 'above-50-capacity',
						label: __( 'dates above 50% capacity',
							'event_espresso'
						),
					},
					{
						value: 'below-50-capacity',
						label: __( 'dates below 50% capacity',
							'event_espresso'
						),
					},
					{
						value: 'expired-only',
						label: __( 'expired dates only',
							'event_espresso'
						),
					},
				] }
				onChange={ setShow }
			/>
		);
	};

	/**
	 * @param {string} sort
	 * @param {Function} setSort
	 * @return {Object} rendered sort filter
	 */
	sort = ( sort, setSort ) => {
		return (
			<SelectControl
				label={ __( 'sort', 'event_espresso' ) }
				className="espresso-date-list-filter-bar-order-select"
				value={ sort }
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
				onChange={ setSort }
			/>
		);
	};

	/**
	 * @param {string} display
	 * @param {Function} setDisplay
	 * @return {Object} rendered display filter
	 */
	display = ( display, setDisplay ) => {
		return (
			<SelectControl
				label={ __( 'display', 'event_espresso' ) }
				className="espresso-date-list-filter-bar-display-select"
				value={ display }
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
				onChange={ setDisplay }
			/>
		);
	};

	render() {
		const {
			display,
			show,
			sort,
			setDisplay,
			setShow,
			setSort,
		} = this.props;
		const showFilter = (
			<div className="ee-show-dates-filter ee-filter-bar-filter">
				{ this.show( show, setShow ) }
			</div>
		);
		const sortFilter = (
			<div className="ee-sort-dates-filter ee-filter-bar-filter">
				{ this.sort( sort, setSort ) }
			</div>
		);
		const displayFilter = (
			<div className="ee-display-dates-dates-filter ee-filter-bar-filter">
				{ this.display( display, setDisplay ) }
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

export default DatesListFilterBar;
