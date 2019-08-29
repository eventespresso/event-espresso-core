/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';

const { FormInfo } = twoColumnAdminFormLayout;

/**
 * @function TicketAssignmentsFormErrorInfo
 *
 * @param {string} errorMessage
 * @param {boolean} dismissable
 * @param {number} colSize
 * @param {number} offset
 * @return {Function} rendered form info
 */
const TicketAssignmentsFormErrorInfo = ( {
	errorMessage,
	dismissable = true,
	colSize = 10,
	offset = 1,
} ) => {
	return useMemo( () => {
		return errorMessage ?
			<FormInfo
				formInfo={ errorMessage }
				dashicon={ 'warning' }
				dismissable={ dismissable }
				colSize={ colSize }
				offset={ offset }
			/> : null;
	}, [ errorMessage, dismissable, colSize, offset ] );
};

export default TicketAssignmentsFormErrorInfo;
