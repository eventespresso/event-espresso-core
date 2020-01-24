import { useMemo } from 'react';

import { EditorModalsHook } from './';
import useAddDatetimeModal from '../../eventEditor/datetimes/useAddDatetimeModal';
import useEditDatetimeModal from '../../eventEditor/datetimes/useEditDatetimeModal';
import useAddTicketModal from '../../eventEditor/tickets/useAddTicketModal';
import useEditTicketModal from '../../eventEditor/tickets/useEditTicketModal';
import useTicketPriceCalculatorModal from '../../eventEditor/tickets/ticketPriceCalculator/hooks/useTicketPriceCalculatorModal';

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
