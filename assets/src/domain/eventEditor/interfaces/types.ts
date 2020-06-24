import { RelationalData } from '../../../application/services/apollo/relations/types';
import { EventEspressoDomData } from '../../../application/DomDataTypes';
import { CurrentUserProps, GeneralSettings } from '../../../application/valueObjects/config/types';
import { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, Event } from '../services/apollo/types';

export interface EditorData {
	event: EventData;
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
}

export interface EventData extends Event {
	dbId: number;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

export interface EventEditorData {
	event: EventData;
}

export interface EventEditorDomData extends EventEspressoDomData {
	eventEditor: EventEditorData;
}
