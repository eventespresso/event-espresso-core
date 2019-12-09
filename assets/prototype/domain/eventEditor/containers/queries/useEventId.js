const useEventId = () => {
	const { eeEditorEventData: { eventId = 0 } = {} } = window;
	return eventId;
};

export default useEventId;
