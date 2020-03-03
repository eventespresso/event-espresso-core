import { useMemo } from 'react';

import { FormModalsHook } from './types';
import useAddDatetimeModal from '../../../eventEditor/ui/datetimes/useAddDatetimeModal';
import useEditDatetimeModal from '../../../eventEditor/ui/datetimes/useEditDatetimeModal';
import useAddTicketModal from '../../../eventEditor/ui/tickets/useAddTicketModal';
import useEditTicketModal from '../../../eventEditor/ui/tickets/useEditTicketModal';
import useTicketPriceCalculatorModal from '../../../eventEditor/ui/tickets/ticketPriceCalculator/hooks/useTicketPriceCalculatorModal';

const useEditors: FormModalsHook = ({ entityId, entityDbId }) => {
	const addDatetime = useAddDatetimeModal();
	const editDatetime = useEditDatetimeModal({ entityId, entityDbId });
	const addTicket = useAddTicketModal();
	const editTicket = useEditTicketModal({ entityId, entityDbId });
	const ticketPriceCalculator = useTicketPriceCalculatorModal({ entityId, entityDbId });

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
