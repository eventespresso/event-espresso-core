import { useMemo } from 'react';

import { FormModalsHook } from './types';
import useAddDatetimeModal from '@edtrUI/datetimes/hooks/useAddDatetimeModal';
import useEditDatetimeModal from '@edtrUI/datetimes/hooks/useEditDatetimeModal';
import useAddTicketModal from '@edtrUI/tickets/hooks/useAddTicketModal';
import useEditTicketModal from '@edtrUI/tickets/hooks/useEditTicketModal';

const useEditors: FormModalsHook = ({ entityId, entityDbId }) => {
	const addDatetime = useAddDatetimeModal();
	const editDatetime = useEditDatetimeModal({ entityId, entityDbId });
	const addTicket = useAddTicketModal();
	const editTicket = useEditTicketModal({ entityId, entityDbId });

	return useMemo(() => {
		return {
			addDatetime,
			editDatetime,
			addTicket,
			editTicket,
		};
	}, [entityId, addDatetime, editDatetime, addTicket, editTicket]);
};

export default useEditors;
