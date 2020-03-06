import { RelationalData } from '../../../application/services/apollo/relations/types';
import { JsDataProps } from '../../../application/services/config/types';
import { CurrentUserProps, GeneralSettings } from '../../../application/valueObjects/config/types';
import { DatetimeEdge, TicketEdge, PriceEdge, PriceTypeEdge } from '../services/apollo/types';
import { EntityId } from '@appServices/apollo/types';

export interface EventData {
	dbId: number;
	datetimes?: DatetimeEdge;
	tickets?: TicketEdge;
	prices?: PriceEdge;
	priceTypes?: PriceTypeEdge;
	relations?: RelationalData;
}

export interface EEEditorData {
	event: EventData;
	graphqlEndpoint?: string;
	currentUser?: CurrentUserProps;
	generalSettings?: GeneralSettings;
	i18n?: any;
}

export interface EEJSData {
	data: JsDataProps;
}

export enum DisplayDates {
	start = 'start',
	end = 'end',
	both = 'both',
}

declare global {
	interface Window {
		eeEditorData: EEEditorData;
		eejsdata: EEJSData;
	}
}

export interface ListItemProps {
	id: EntityId;
}

export interface EditItemProps {
	position?: string;
	related?: EntityId[];
}

export interface EditItemButtonProps {
	position?: string;
}

export interface EditItemModalProps {
	id: EntityId;
}

export interface AddItemModalProps {
	onClose: () => void;
	isOpen: boolean;
}

export interface EditItemFormProps {
	title?: string;
	formReset?: boolean;
}
