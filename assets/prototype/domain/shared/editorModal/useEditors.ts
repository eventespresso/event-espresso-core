import useAddDatetimeModal from '../../eventEditor/datetimes/useAddDatetimeModal';
import useEditDatetimeModal from '../../eventEditor/datetimes/useEditDatetimeModal';
import useAddTicketModal from '../../eventEditor/tickets/useAddTicketModal';
import useEditTicketModal from '../../eventEditor/tickets/useEditTicketModal';
import useTicketPriceCalculatorModal from '../../eventEditor/tickets/ticketPriceCalculator/hooks/useTicketPriceCalculatorModal';
import { EntityId } from '../../../application/ui/components/layout/eeditorModal';
import { EditorModals } from './';

const useEditorModals = (entityId: EntityId): EditorModals => {
	const addDatetime = useAddDatetimeModal();
	const editDatetime = useEditDatetimeModal(entityId);
	const addTicket = useAddTicketModal();
	const editTicket = useEditTicketModal(entityId);
	const ticketPriceCalculator = useTicketPriceCalculatorModal(entityId);

	return {
		addDatetime,
		editDatetime,
		addTicket,
		editTicket,
		ticketPriceCalculator,
	};
};

export default useEditorModals;
