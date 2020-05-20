import { RelationalData } from '../../../application/services/apollo/relations/types';
import { JsDataProps } from '../../../application/services/config/types';
import { CurrentUserProps, GeneralSettings } from '../../../application/valueObjects/config/types';
import { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge, Event } from '../services/apollo/types';

export interface EventData {
	dbId: number;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

export interface EEEditorData {
	assetsUrl?: string;
	event: EventData;
	graphqlEndpoint?: string;
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
	i18n?: any;
}

export interface EEJSData {
	data: JsDataProps;
}

declare global {
	interface Window {
		eeEditorData: EEEditorData;
		eejsdata: EEJSData;
		eeDomain: string;
	}
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
