/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useCallback } from '@wordpress/element';
import { EspressoTable } from '@eventespresso/components';

const { TableDataCell } = EspressoTable;

/**
 * @function
 * @param {number} ticketCount
 * @return {Function} callback for generating year row
 */
const useGenerateYearRow = ( ticketCount ) => useCallback(
	/**
	 * @function
	 * @param {number} year
	 * @return {Array} data for a row showing the year
	 */
	( year ) => {
		const yearRow = {
			type: 'row',
			key: `tam-year-row-${ year }`,
			class: 'ee-tam-year-row',
			cells: [ {
				type: 'cell',
				key: `tam-date-label-${ year }`,
				class: 'ee-tam-date-label',
				value: year,
			} ],
		};
		for ( let x = 0; x < ticketCount; x++ ) {
			yearRow.cells.push( {
				type: 'cell',
				key: `tam-ticket-col-${ x + 1 }`,
				value: '',
				render: ( rowNumber, colNumber ) => (
					<TableDataCell
						key={ `row-${ rowNumber }-col-${ colNumber }` }
						rowNumber={ rowNumber }
						colNumber={ colNumber }
						htmlClass={ 'ee-tam-date-row-ticket' }
					>
					</TableDataCell>
				),
			} );
		}
		return yearRow;
	},
	[ ticketCount ]
);

useGenerateYearRow.propTypes = {
	ticketCount: PropTypes.number.isRequired,
};

export default useGenerateYearRow;
