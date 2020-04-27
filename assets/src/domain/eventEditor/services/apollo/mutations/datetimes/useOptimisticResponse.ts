import { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';
import { v4 as uuidv4 } from 'uuid';

import { Datetime, DatetimeItem } from '@edtrServices/apollo/types';
import { GET_DATETIME } from '@edtrServices/apollo/queries';
import { MutationType, MutationInput } from '@appServices/apollo/mutations/types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '@sharedConstants/defaultDates';
import { removeNullAndUndefined } from '@appServices/utilities/predicates';
import { ucFirst } from '@appServices/utilities/text';

export const DATETIME_DEFAULTS: Datetime = {
	id: '',
	dbId: 0,
	cacheId: uuidv4(),
	capacity: -1,
	description: '',
	endDate: PLUS_TWO_MONTHS.toISOString(),
	isActive: false,
	isExpired: false,
	isPrimary: false,
	isSoldOut: false,
	isTrashed: false,
	isUpcoming: false,
	length: 0,
	name: '',
	order: 0,
	reserved: 0,
	sold: 0,
	startDate: PLUS_ONE_MONTH.toISOString(),
	status: null,
};

type OptimisticResCb = (mutationType: MutationType, input: MutationInput) => any;

const useOptimisticResponse = (): OptimisticResCb => {
	const client = useApolloClient();

	return useCallback<OptimisticResCb>((mutationType, input) => {
		let espressoDatetime: Partial<Datetime> = {
			__typename: 'EspressoDatetime',
		};
		// Get rid of null or undefined values
		const filteredInput = removeNullAndUndefined(input);
		let data: DatetimeItem;
		try {
			data = client.readQuery<DatetimeItem>({
				query: GET_DATETIME,
				variables: {
					id: input.id,
				},
			});
		} catch (error) {
			// do nothing
		}
		const datetime = pathOr<Datetime>(null, ['datetime'], data);

		switch (mutationType) {
			case MutationType.Create:
				espressoDatetime = {
					...espressoDatetime,
					...DATETIME_DEFAULTS,
					...filteredInput,
				};
				break;
			case MutationType.Delete:
				espressoDatetime = {
					...espressoDatetime,
					...datetime,
					...filteredInput,
					isTrashed: true,
					cacheId: uuidv4(),
				};
				break;
			case MutationType.Update:
				espressoDatetime = {
					...espressoDatetime,
					...datetime,
					...filteredInput,
					cacheId: uuidv4(),
				};
				break;
		}

		const lcMutationtype = mutationType.toLowerCase();
		const ucFirstMutationtype = ucFirst(lcMutationtype);

		// e.g. "deleteEspressoDatetime", "createEspressoDatetime"
		const mutation = `${lcMutationtype}EspressoDatetime`;

		return {
			__typename: 'RootMutation',
			[mutation]: {
				__typename: `${ucFirstMutationtype}EspressoDatetimePayload`,
				espressoDatetime,
			},
		};
	}, []);
};

export default useOptimisticResponse;
