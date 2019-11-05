/**
 * useTicketsRegistrationCount
 *
 * A custom react hook for retrieving the ticket to
 * registration count mapping.
 *
 * @return {Object} A mapping from ticket ID to registration count;
 */
const useTicketsRegistrationCount = () => {
	const { tktRegCount = {} } = window.eeEditorEventData;
	return tktRegCount;
};

export default useTicketsRegistrationCount;
