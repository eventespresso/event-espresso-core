import { useCallback } from 'react';
import { OperationVariables } from 'apollo-client';

import useEventId from '../../queries/events/useEventId';
import { MutationType, MutationInput } from '@appServices/apollo/mutations';

type MutationVariablesCb = (mutationType: MutationType, input: MutationInput) => OperationVariables;

const useMutationVariables = (): MutationVariablesCb => {
	const eventId = useEventId();

	return useCallback<MutationVariablesCb>((mutationType, input) => {
		const mutationInput: MutationInput = {
			clientMutationId: `${mutationType}_DATETIME`,
			...input,
		};

		if (mutationType === 'CREATE') {
			mutationInput.eventId = eventId; // required for createDatetime
		}

		return {
			input: mutationInput,
		};
	}, []);
};

export default useMutationVariables;
