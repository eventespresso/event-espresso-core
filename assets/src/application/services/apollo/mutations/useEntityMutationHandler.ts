import { useState, useMemo, useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { FetchResult } from 'apollo-link';

import useIfMounted from '../../hooks/useIfMounted';
import { useSystemNotifications } from '../../toaster';
import { OnMutationCompletedFn, OnMutationErrorFn, MutationResult, CustomMutationOptions, MutationType } from './types';

const DEFAULT_RESULT: MutationResult = { called: false, loading: false };

const useEntityMutationHandler = (getMutationOptions, typeName: string, id?: string): any => {
	const client = useApolloClient();
	const [result, setResult] = useState(DEFAULT_RESULT);
	const ifMounted = useIfMounted();
	const toaster = useSystemNotifications();

	const getCreateMutation = useCallback(
		(input) => {
			return getMutationOptions(MutationType.Create, input);
		},
		[getMutationOptions]
	);

	const getUpdateMutation = useCallback(
		(input) => {
			return getMutationOptions(MutationType.Update, { id, ...input });
		},
		[getMutationOptions, id]
	);

	const getDeleteMutation = useCallback(
		(input) => {
			return getMutationOptions(MutationType.Delete, { id, ...input });
		},
		[getMutationOptions, id]
	);

	const getToasterMessage = useCallback(
		(mutationType: MutationType, suffix: 'ing' | 'ed' = 'ing'): string => {
			// For example "CREATE" will become "creating" or "created"
			const verb = mutationType.toLowerCase().replace(/e$/, suffix);
			// e.g. "updating datetime"
			return `${verb} ${typeName.toLowerCase()}`;
		},
		[typeName]
	);

	const getToasterKey = useCallback(
		(mutationType: MutationType): string => {
			return `${mutationType}:${typeName}:${id}`;
		},
		[id, typeName]
	);

	const updateResult = useCallback(
		(result: MutationResult): void => {
			// set state only if mounted
			// to avoid the state update on unmounted components.
			ifMounted(() => setResult(result));
		},
		[ifMounted]
	);

	const onMutationStart = useCallback(
		(mutationType: MutationType): void => {
			const key = getToasterKey(mutationType);
			const message = getToasterMessage(mutationType);

			toaster.loading({ autoClose: false, key, message });

			updateResult({
				loading: true,
				error: undefined,
				data: undefined,
				called: true,
			});
		},
		[getToasterKey, getToasterMessage, /* toaster, */ updateResult]
	);

	const onMutationComplete = useCallback(
		(response: FetchResult, onCompleted: OnMutationCompletedFn, mutationType: MutationType): void => {
			const key = getToasterKey(mutationType);

			const successMessage = `successfully ${getToasterMessage(mutationType, 'ed')}`;
			toaster.update({ key, message: successMessage, type: 'success' });

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
		},
		[getToasterKey, getToasterMessage, /* toaster, */ updateResult]
	);

	const onMutationError = useCallback(
		(error: Error, onError: OnMutationErrorFn, mutationType: MutationType): void => {
			const errorMessage = `error ${getToasterMessage(mutationType)}`;
			toaster.dismiss(getToasterKey(mutationType));
			toaster.error({ message: errorMessage });

			updateResult({
				loading: false,
				error,
				data: undefined,
				called: true,
			});

			if (typeof onError === 'function') {
				onError(error);
			}
		},
		[getToasterKey, getToasterMessage, /* toaster, */ updateResult]
	);

	const mutate = useCallback(
		(options: CustomMutationOptions, mutationType: MutationType): MutationResult => {
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
		},
		[client, onMutationComplete, onMutationError, onMutationStart, result]
	);

	return useMemo(
		() => ({
			getCreateMutation,
			getUpdateMutation,
			getDeleteMutation,
			mutate,
		}),
		[getCreateMutation, getDeleteMutation, getUpdateMutation, mutate]
	);
};

export default useEntityMutationHandler;
