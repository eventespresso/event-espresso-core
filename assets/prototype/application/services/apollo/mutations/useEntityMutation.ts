import { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { ApolloError, MutationUpdaterFn, MutationOptions, OperationVariables } from 'apollo-client';
import { DataProxy } from 'apollo-cache';
import { FetchResult } from 'apollo-link';
import { pathOr } from 'ramda';

import { mutations, useMutators } from '../../../../domain/eventEditor/data/mutations';
import useIfMounted from '../../../hooks/useIfMounted';
import useToaster from '../../toaster/useToaster';
import { ucFirst } from '../../../utilities/text';
import {
	EntityMutation,
	OnMutationCompletedFn,
	OnUpdateFn,
	OnMutationErrorFn,
	MutationInput,
	MutationResult,
	CustomMutationOptions,
	Mutator,
	MutationType,
	EntityType,
} from './types';

const DEFAULT_RESULT: MutationResult = { called: false, loading: false };

/**
 * @param {string} type Entity type name
 * @param id
 */
const useEntityMutation = (type: EntityType, id?: string): EntityMutation => {
	const client = useApolloClient();
	const [result, setResult] = useState(DEFAULT_RESULT);
	const mutators = useMutators();
	const ifMounted = useIfMounted();
	const toaster = useToaster();

	/**
	 * @param {string} mutationType Type of mutation - CREATE|UPDATE|DELETE
	 */
	const getMutation = (mutationType: MutationType): any => {
		// For example "CREATE_DATETIME"
		const mutation = `${mutationType}_${type.toUpperCase()}`;
		return mutations[mutation];
	};

	/**
	 * @param {string} mutationType Type of mutation
	 * @param {object} input     Mutation input
	 */
	const getMutationOptions = (mutationType: MutationType, input: MutationInput = {}): OperationVariables => {
		// e.g. "datetimeMutator"
		const key = `${type.toLowerCase()}Mutator`;
		const mutator: Mutator = mutators[key];
		/**
		 * options = {
		 *     variables,
		 *     optimisticResponse,
		 * 	   onUpdate,
		 *     onCompleted,
		 * 	   onError,
		 * }
		 */
		const { onUpdate, ...mutationOptions } = mutator(mutationType, input);

		let update: MutationUpdaterFn;

		if (typeof onUpdate === 'function') {
			update = getUpdateCallback(mutationType, onUpdate);
		}

		return { ...mutationOptions, update };
	};

	/**
	 */
	const getUpdateCallback = (mutationType: MutationType, onUpdate: OnUpdateFn): MutationUpdaterFn => {
		/**
		 * Since every mutation update callback is interested
		 * in the updated entity data in response, we will
		 * pass just that entity to onUpdate.
		 */
		return (proxy: DataProxy, result: FetchResult): void => {
			// e.g. "createDatetime", "updateTicket"
			const mutationName = `${mutationType.toLowerCase()}Espresso${type}`;
			// Example result: { data: { deletePrice: { price : {...} } } }
			const path: string[] = ['data', mutationName, `espresso${type}`];
			const entity: any = pathOr({}, path, result);

			onUpdate({ proxy, entity });
		};
	};

	/**
	 * @param {object} input
	 */
	const getCreateMutation = (input: MutationInput): MutationOptions => {
		const mutation: any = getMutation(MutationType.Create);
		const options: OperationVariables = getMutationOptions(MutationType.Create, input);

		return { mutation, ...options };
	};

	/**
	 * @param {object} input
	 */
	const getUpdateMutation = (input: MutationInput): MutationOptions => {
		const mutation: any = getMutation(MutationType.Update);
		const options: OperationVariables = getMutationOptions(MutationType.Update, { id, ...input });

		return { mutation, ...options };
	};

	/**
	 * @param {object} input
	 */
	const getDeleteMutation = (input: MutationInput): MutationOptions => {
		const mutation: any = getMutation(MutationType.Delete);
		const options: OperationVariables = getMutationOptions(MutationType.Delete, { id, ...input });

		return { mutation, ...options };
	};

	/**
	 * @param {string} mutationType Type of mutation - CREATE|UPDATE|DELETE
	 * @param {string} suffix       Suffix to be added to mutation type
	 */
	const getToasterMessage = (mutationType: MutationType, suffix: 'ing' | 'ed' = 'ing'): any => {
		// For example "CREATE" will become "creating" or "created"
		const verb = mutationType.toLowerCase().replace(/e$/, suffix);
		// e.g. "updating datetime"
		return `${verb} ${type.toLowerCase()}`;
	};

	/**
	 *
	 */
	const onMutationStart = (mutationType: MutationType): void => {
		const message = getToasterMessage(mutationType);
		toaster.loading(true, message);

		updateResult({
			loading: true,
			error: undefined,
			data: undefined,
			called: true,
		});
	};

	/**
	 *
	 */
	const onMutationComplete = (
		response: FetchResult,
		onCompleted: OnMutationCompletedFn,
		mutationType: MutationType
	): void => {
		const dismissMessage = getToasterMessage(mutationType);
		const successMessage = `successfully ${getToasterMessage(mutationType, 'ed')}`;
		toaster.dismiss(dismissMessage);
		toaster.success(successMessage);
		const { data, errors } = response;
		const error = errors && errors.length > 0 ? new ApolloError({ graphQLErrors: errors }) : undefined;

		updateResult({
			called: true,
			loading: false,
			data,
			error,
		});

		if (typeof onCompleted === 'function') {
			onCompleted(data);
		}
	};

	/**
	 *
	 */
	const onMutationError = (error: Error, onError: OnMutationErrorFn, mutationType: MutationType): void => {
		const dismissMessage = getToasterMessage(mutationType);
		const successMessage = `error ${getToasterMessage(mutationType)}`;
		toaster.dismiss(dismissMessage);
		toaster.success(successMessage);

		updateResult({
			loading: false,
			error,
			data: undefined,
			called: true,
		});

		if (typeof onError === 'function') {
			onError(error);
		}
	};

	/**
	 *
	 */
	const updateResult = (result: MutationResult): void => {
		// set state only if mounted
		// to avoid the state update on unmounted components.
		ifMounted(() => setResult(result));
	};

	/**
	 *
	 */
	const mutate = (options: CustomMutationOptions, mutationType: MutationType): MutationResult => {
		const { onCompleted, onError, ...mutationOptions } = options;
		onMutationStart(mutationType);
		client
			.mutate(mutationOptions)
			.then((response: FetchResult) => {
				onMutationComplete(response, onCompleted, mutationType);
				return response;
			})
			.catch((error: Error) => {
				onMutationError(error, onError, mutationType);
				throw error;
			});

		return result;
	};

	return {
		getCreateMutation,
		getUpdateMutation,
		getDeleteMutation,
		mutate,
	};
};

export default useEntityMutation;
