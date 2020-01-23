// @ts-nocheck
import { EditorModalCallback } from '../../../application/ui/components/layout/eeditorModal/types';

export interface EditorModals {
	addDatetime: EditorModalCallback;
	editDatetime: EditorModalCallback;
	addTicket: EditorModalCallback;
	editTicket: EditorModalCallback;
	ticketPriceCalculator: EditorModalCallback;
}
