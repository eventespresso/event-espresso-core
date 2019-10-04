/**
 * External imports
 */
import PropTypes from 'prop-types';
import { useCallback } from '@wordpress/element';
import { CalendarPageDate } from '@eventespresso/components';
import { dateTimeModel } from '@eventespresso/model';
import { shortenCuid } from '@eventespresso/utils';

const { getBackgroundColorClass } = dateTimeModel;

/**
 * @function
 * @return {Function} callback for generating data header
 */
const useGenerateDateHeader = () => {
	/**
	 * @function
	 * @param {BaseEntity} eventDate
	 * @return {Object} cell data for a date header
	 */
	return useCallback( ( eventDate ) => {
		const statusClass = getBackgroundColorClass( eventDate );
		return {
			type: 'cell',
			key: `tam-date-cell-${ eventDate.id }`,
			class: 'ee-tam-date-label',
			value: (
				<div className="ee-tam-date-label-div">
					<div className="ee-tam-date-label-inner">
						<div className="ee-tam-date-id">
							{ `#${ shortenCuid( eventDate.id ) }` }
						</div>
						<div className="ee-tam-date-label-text">
							{ eventDate.name }
						</div>
					</div>
					<CalendarPageDate
						startDate={ eventDate.start }
						statusClass={ statusClass }
						size={ 'small' }
					/>
				</div>
			),
		};
	}, [] );
};

useGenerateDateHeader.propTypes = {
	eventDate: PropTypes.object.isRequired,
};

export default useGenerateDateHeader;
