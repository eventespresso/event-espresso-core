import { useMemo } from 'react';

import { EditorModalsHook } from '.';
import useAddDatetimeModal from '../../../eventEditor/ui/datetimes/useAddDatetimeModal';
import useEditDatetimeModal from '../../../eventEditor/ui/datetimes/useEditDatetimeModal';
import useAddTicketModal from '../../../eventEditor/ui/tickets/useAddTicketModal';
import useEditTicketModal from '../../../eventEditor/ui/tickets/useEditTicketModal';
import useTicketPriceCalculatorModal from '../../../eventEditor/ui/tickets/ticketPriceCalculator/hooks/useTicketPriceCalculatorModal';

const useEditors: EditorModalsHook = (entityId) => {
	const addDatetime = useAddDatetimeModal();
	const editDatetime = useEditDatetimeModal(entityId);
	const addTicket = useAddTicketModal();
	const editTicket = useEditTicketModal(entityId);
	const ticketPriceCalculator = useTicketPriceCalculatorModal(entityId);

	return useMemo(() => {
		return {
			addDatetime,
			editDatetime,
			addTicket,
			editTicket,
			ticketPriceCalculator,
		};
	}, [entityId, addDatetime, editDatetime, addTicket, editTicket, ticketPriceCalculator]);
};

export default useEditors;
