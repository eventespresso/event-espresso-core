import { useState, useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { ApolloError, MutationOptions } from 'apollo-client';
import { FetchResult } from 'apollo-link';

import useIfMounted from '../../hooks/useIfMounted';
import useToaster from '../../toaster/useToaster';
import {
	BaseType,
	OnMutationCompletedFn,
	OnMutationErrorFn,
	MutationResult,
	CustomMutationOptions,
	MutationType,
	MutationHandler,
} from './types';

const DEFAULT_RESULT: MutationResult = { called: false, loading: false };

/**
 * @param {string} typeName Entity type name
 * @param id
 */
const useMutationHandler: MutationHandler = (getMutationOptions) => {
	const client = useApolloClient();
	const [result, setResult] = useState(DEFAULT_RESULT);
	const ifMounted = useIfMounted();
	const toaster = useToaster();

	return useCallback(
		<Name extends string>(typeName: Name, id?: string) => {
			/**
			 * @param {object} input
			 */
			const getCreateMutation = <Type extends BaseType, MI>(input: MI): MutationOptions<Type> => {
				return getMutationOptions<Type, MI>(MutationType.Create, input);
			};

			/**
			 * @param {object} input
			 */
			const getUpdateMutation = <Type extends BaseType, MI>(input: MI): MutationOptions<Type> => {
				return getMutationOptions<Type>(MutationType.Update, { id, ...input });
			};

			/**
			 * @param {object} input
			 */
			const getDeleteMutation = <Type extends BaseType, MI>(input: MI): MutationOptions<Type> => {
				return getMutationOptions<Type>(MutationType.Delete, { id, ...input });
			};

			/**
			 * @param {string} mutationType Type of mutation - CREATE|UPDATE|DELETE
			 * @param {string} suffix       Suffix to be added to mutation typeName
			 */
			const getToasterMessage = (mutationType: MutationType, suffix: 'ing' | 'ed' = 'ing'): any => {
				// For example "CREATE" will become "creating" or "created"
				const verb = mutationType.toLowerCase().replace(/e$/, suffix);
				// e.g. "updating datetime"
				return `${verb} ${typeName.toLowerCase()}`;
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
				const errorMessage = `error ${getToasterMessage(mutationType)}`;
				toaster.dismiss(dismissMessage);
				toaster.error(errorMessage);

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
		},
		[getMutationOptions]
	);
};

export default useMutationHandler;
