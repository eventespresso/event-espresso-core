/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useCallback } from '@wordpress/element';

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
		const rowData = [
			{
				type: 'row',
				value: '',
				class: 'ee-tam-year-row',
			},
			{
				type: 'cell',
				value: year,
				class: 'ee-tam-date-label',
			},
		];
		for ( let x = 0; x < ticketCount; x++ ) {
			rowData.push(
				{
					type: 'cell',
					value: '',
					render: ( rowNumber, colNumber ) => (
						<td
							key={ `row-${ rowNumber }-col-${ colNumber }` }
							className={
								'ee-tam-date-row-ticket ee-rspnsv-table-body-td'
							}
						>
						</td>
					),
				}
			);
		}
		return rowData;
	},
	[]
);

useGenerateYearRow.propTypes = {
	ticketCount: PropTypes.number.isRequired,
};

export default useGenerateYearRow;
