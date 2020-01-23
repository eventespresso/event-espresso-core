// @ts-nocheck
import { EditorModalCallback, EntityId } from '../../../application/ui/components/layout/eeditorModal/types';

export interface EditorModals {
	addDatetime: EditorModalCallback;
	editDatetime: EditorModalCallback;
	addTicket: EditorModalCallback;
	editTicket: EditorModalCallback;
	ticketPriceCalculator: EditorModalCallback;
}

export type EditorModalsHook = (entityId: EntityId) => () => EditorModals;
