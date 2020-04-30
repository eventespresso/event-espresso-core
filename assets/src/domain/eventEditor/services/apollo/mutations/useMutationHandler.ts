import { useCallback } from 'react';

import useDatetimeMutationHandler from './datetimes/useDatetimeMutationHandler';
import useTicketMutationHandler from './tickets/useTicketMutationHandler';
import usePriceMutationHandler from './prices/usePriceMutationHandler';
import { MutationHandler, TypeName } from './types';

type MutationHandlerCb = (typeName: TypeName) => MutationHandler;

const useMutationHandler = (): MutationHandlerCb => {
	const datetimeMutationHandler = useDatetimeMutationHandler();
	const ticketMutationHandler = useTicketMutationHandler();
	const priceMutationHandler = usePriceMutationHandler();

	return useCallback(
		(typeName: TypeName): MutationHandler => {
			switch (typeName) {
				case TypeName.Datetime:
					return datetimeMutationHandler;
				case TypeName.Ticket:
					return ticketMutationHandler;
				case TypeName.Price:
					return priceMutationHandler;
			}
		},
		[datetimeMutationHandler, ticketMutationHandler, priceMutationHandler]
	);
};

export default useMutationHandler;
