import { RelationalData } from '../../../application/services/apollo/relations/types';
import { EventEspressoDomData } from '../../../application/services/config/types';
import { CurrentUserProps, GeneralSettings } from '../../../application/valueObjects/config/types';
import { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, Event } from '../services/apollo/types';

export interface EditorData {
	event: EventData;
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
}

export interface EventData {
	dbId: number;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

// All of the above defs will be removed
export interface EventEditorData {
	event: Event;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

export interface EventEditorDomData extends EventEspressoDomData {
	eventEditor: EventEditorData;
}
