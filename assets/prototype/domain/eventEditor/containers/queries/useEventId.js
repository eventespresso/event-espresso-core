const useEventId = () => {
	const eventData = window.eeEditorEventData;
	const { eventId } = eventData;
	return eventId;
};

export default useEventId;
