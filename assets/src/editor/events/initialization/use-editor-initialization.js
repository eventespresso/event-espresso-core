import {
	useEventEditorEvent,
	useEventDatesForEvent,
	useEventVenue,
	useTicketsForEventDates,
} from '../hooks';

const useEditorInitialization = ( eventId ) => {
	const { eventEntity, eventEntityLoaded } = useEventEditorEvent( eventId );
	const {
		dateEntities,
		dateEntitiesLoaded,
	} = useEventDatesForEvent( eventEntity, eventEntityLoaded );
	const {
		ticketEntities,
		ticketEntitiesLoaded,
	} = useTicketsForEventDates( dateEntities, dateEntitiesLoaded );
	const {
		venueEntity,
		venueEntityLoaded,
	} = useEventVenue( eventEntity, eventEntityLoaded );
	return {
		eventEntity,
		eventEntityLoaded,
		dateEntities,
		dateEntitiesLoaded,
		ticketEntities,
		ticketEntitiesLoaded,
		venueEntity,
		venueEntityLoaded,
	};
};

export default useEditorInitialization;
