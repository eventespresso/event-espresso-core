/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import PropTypes from 'prop-types';

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
	dismissable,
	colSize,
	offset,
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

TicketAssignmentsFormErrorInfo.propTypes = {
	errorMessage: PropTypes.string,
	dismissable: PropTypes.bool,
	colSize: PropTypes.number,
	offset: PropTypes.number,
};

TicketAssignmentsFormErrorInfo.defaultProps = {
	dismissable: true,
	colSize: 10,
	offset: 1,
};

export default TicketAssignmentsFormErrorInfo;
