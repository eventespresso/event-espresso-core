import { OperationVariables } from 'apollo-client';
import { pathOr } from 'ramda';
import { useApolloClient } from '@apollo/react-hooks';

import useEventId from '../../queries/events/useEventId';
import useDatetimeQueryOptions from '../../queries/datetimes/useDatetimeQueryOptions';
import useOnCreateDatetime from './useOnCreateDatetime';
import useOnUpdateDatetime from './useOnUpdateDatetime';
import useOnDeleteDatetime from './useOnDeleteDatetime';
import {
	Mutator,
	MutationType,
	MutationInput,
	OnUpdateFnOptions,
	MutatorGeneratedObject,
} from '../../../../../application/services/apollo/mutations/types';
import { ucFirst } from '../../../../../application/utilities/text';
import { DEFAULT_DATETIME_LIST_DATA as DEFAULT_LIST_DATA, queries } from '../../queries';
import { Datetime, DatetimeEdge, DatetimesList, DatetimeItem } from '../../types';
import { PLUS_ONE_MONTH, PLUS_TWO_MONTHS } from '../../../../shared/defaultDates';

const { GET_DATETIME } = queries;

const DATETIME_DEFAULTS: Datetime = {
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

/**
 *
 */
const useDatetimeMutator = (): Mutator => {
	const eventId = useEventId();

	const options = useDatetimeQueryOptions();
	const client = useApolloClient();

	const onCreateDatetime = useOnCreateDatetime();
	const onUpdateDatetime = useOnUpdateDatetime();
	const onDeleteDatetime = useOnDeleteDatetime();

	const createVariables = (mutationType: MutationType, input: MutationInput): OperationVariables => {
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
	};

	const createOptimisticResponse = (mutationType: MutationType, input: MutationInput): any => {
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
	};

	const mutator = (mutationType: MutationType, input: MutationInput): MutatorGeneratedObject => {
		const variables = createVariables(mutationType, input);
		const optimisticResponse = createOptimisticResponse(mutationType, input);

		const onUpdate = ({ proxy, entity: datetime }: OnUpdateFnOptions<Datetime>): void => {
			// Read the existing data from cache.
			let data: DatetimesList;
			try {
				data = proxy.readQuery<DatetimesList>(options);
			} catch (error) {
				data = null;
			}
			const datetimes = pathOr<DatetimeEdge>(DEFAULT_LIST_DATA, ['espressoDatetimes'], data);
			const { tickets = [] } = input;

			switch (mutationType) {
				case MutationType.Create:
					onCreateDatetime({ proxy, datetimes, datetime, tickets });
					break;
				case MutationType.Update:
					onUpdateDatetime({ datetime, tickets });
					break;
				case MutationType.Delete:
					onDeleteDatetime({ proxy, datetimes, datetime });
					break;
			}
		};

		return { variables, optimisticResponse, onUpdate };
	};

	return mutator;
};

export default useDatetimeMutator;
