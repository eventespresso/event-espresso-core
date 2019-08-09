/**
 * External imports
 */
import PropTypes from 'prop-types';
import { SelectControl } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';

import useDatesListFilterStateSetters from './use-dates-list-filter-state-setters';

/**
 * filters for controlling the display of a list of Event Dates
 *
 * @param {string} listId
 * @param {string} showDates
 * @param {string} datesSortedBy
 * @param {string} displayDates
 * @return {Object} EditorDatesListView with added DateListFilters
 */
const DatesListEntityFilters = ( {
	listId,
	showDates,
	datesSortedBy,
	displayDates,
} ) => {
	const {
		setShowDates,
		setDatesSortedBy,
		setDisplayDates,
	} = useDatesListFilterStateSetters( listId );

	const showDatesControl = useMemo( () => {
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
	}, [ showDates ] );

	const datesSortedByControl = useMemo( () => {
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
	}, [ datesSortedBy ] );

	const displayDatesControl = useMemo( () => {
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
	}, [ displayDates ] );

	return (
		<>
			<div className="ee-show-dates-filter ee-filter-bar-filter">
				{ showDatesControl }
			</div>
			<div className="ee-sort-dates-filter ee-filter-bar-filter">
				{ datesSortedByControl }
			</div>
			<div
				className="ee-display-dates-dates-filter ee-filter-bar-filter">
				{ displayDatesControl }
			</div>
		</>
	);
};

DatesListEntityFilters.propTypes = {
	listId: PropTypes.string.isRequired,
	showDates: PropTypes.string,
	datesSortedBy: PropTypes.string,
	displayDates: PropTypes.string,
};

export default DatesListEntityFilters;
