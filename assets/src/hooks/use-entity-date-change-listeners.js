/**
 * Internal imports
 */
import useEndDateChangeListener from './use-end-date-change-listener';
import useStartDateChangeListener from './use-start-date-change-listener';

/**
 * Verifies that end date value has changed and updates entity accordingly.
 *
 * @function
 * @param {Object} props
 * @member {Object} entity
 * @member {Object} dateProps
 * @member {string} startDateFormKey identifier for React Final Form data schema
 * @member {string} endDateFormKey identifier for React Final Form data schema
 * @member {Function} updateField callback for editing a field
 * @member {Function} touchField callback for marking field as changed
 * @return {Object} entityStartDate & entityEndDate
 */
const useEntityDateChangeListeners = ( props ) => {
	return {
		startDateChangeListener: useStartDateChangeListener( props ),
		endDateChangeListener: useEndDateChangeListener( props ),
	};
};

export default useEntityDateChangeListeners;
