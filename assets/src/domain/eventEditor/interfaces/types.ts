import '../../types';
import { RelationalData } from '../../../application/services/apollo/relations/types';
import { EventEspressoDomData } from '../../../application/DomDataTypes';
import { CurrentUserProps, GeneralSettings } from '../../../application/valueObjects/config/types';
import { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, Event } from '../services/apollo/types';

export interface EventEditorData {
	event?: Event;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

export interface EditorData {
	eventEditor: EventEditorData;
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
}

export interface EventEditorDomData extends EventEspressoDomData {
	eventEditor: EventEditorData;
}
