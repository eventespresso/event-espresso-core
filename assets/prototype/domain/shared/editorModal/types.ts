// @ts-nocheck
import { EditorModalProps, EntityId } from '../../../application/ui/components/layout/eeditorModal/types';

export type EditorModals = {
	addDatetime: EditorModalProps;
	editDatetime: EditorModalProps;
	addTicket: EditorModalProps;
	editTicket: EditorModalProps;
	ticketPriceCalculator: EditorModalProps;
};

export type EditorModalsHook = (entityId: EntityId) => EditorModals;
