import { useMemo } from 'react';

import { FormModalsHook } from './types';
import useAddDatetimeModal from '@edtrUI/datetimes/hooks/useAddDatetimeModal';
import useEditDatetimeModal from '@edtrUI/datetimes/hooks/useEditDatetimeModal';
import useAddTicketModal from '@edtrUI/tickets/hooks/useAddTicketModal';
import useEditTicketModal from '@edtrUI/tickets/hooks/useEditTicketModal';
import useTicketPriceCalculatorModal from '@edtrUI/tickets/ticketPriceCalculator/hooks/useTicketPriceCalculatorModal';

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
