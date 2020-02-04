import { useCallback } from 'react';
import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import { MutationType, MutationInput } from '../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../application/utilities/text';
import { queries } from '../../queries';
import { Datetime, DatetimeItem } from '../../types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/defaultDates';

const { GET_DATETIME } = queries;

export const DATETIME_DEFAULTS: Datetime = {
	id: 'NEW',
	dbId: 0,
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
		let espressoDatetime = {
			__typename: 'EspressoDatetime',
		};
		let data: DatetimeItem, datetime: Datetime;
		switch (mutationType) {
			case MutationType.Create:
				espressoDatetime = {
					...espressoDatetime,
					...DATETIME_DEFAULTS,
					...input,
				};
				break;
			case MutationType.Delete:
				espressoDatetime = {
					...espressoDatetime,
					...input,
				};
				break;
			case MutationType.Update:
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
				datetime = pathOr<Datetime>(null, ['datetime'], data);

				espressoDatetime = {
					...espressoDatetime,
					...datetime,
					...input,
				};
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
