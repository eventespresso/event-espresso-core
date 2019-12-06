import { useApolloClient } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { useState } from '@wordpress/element';
import { pathOr } from 'ramda';

import { mutations } from './';
import useMutators from './useMutators';

/**
 * @param {string} type Entity type name
 */
const useEntityMutation = (type, id = '') => {
	const client = useApolloClient();
	const [result, setResult] = useState({ called: false, loading: false });
	const mutators = useMutators();

	/**
	 * @param {string} mutation Type of mutation - CREATE|UPDATE|DELETE
	 */
	const getMutation = (mutationType = 'UPDATE') => {
		// For example "CREATE_DATETIME"
		const mutation = `${mutationType}_${type.toUpperCase()}`;
		return mutations[mutation];
	};

	/**
	 * @param {string} mutation Type of mutation
	 * @param {object} input     Mutation input
	 */
	const getMutationOptions = (mutationType, input = {}) => {
		// e.g. "datetmeMutator"
		const key = `${type.toLowerCase()}Mutator`;
		const { [key]: mutator } = mutators;
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

		let update;

		if (typeof onUpdate === 'function') {
			update = getUpdateCallback(mutationType, onUpdate);
		}

		return { ...mutationOptions, update };
	};

	/**
	 */
	const getUpdateCallback = (mutationType, onUpdate) => {
		/**
		 * Since every mutation update callback is interested
		 * in the updated entity data in response, we will
		 * pass just that entity to onUpdate.
		 */
		return (proxy, result) => {
			// e.g. "createDatetime", "updateTicket"
			const mutationName = `${mutationType.toLowerCase()}${type}`;
			// Example result: { data: { deletePrice: { price : {...} } } }
			const path = ['data', mutationName, type.toLowerCase()];
			const entity = pathOr({}, path, result);

			onUpdate({ proxy, entity });
		};
	};

	/**
	 * @param {object} input
	 */
	const getCreateMutation = (input) => {
		const mutationType = 'CREATE';
		const mutation = getMutation(mutationType);
		const options = getMutationOptions(mutationType, input);

		return { mutation, ...options };
	};

	/**
	 * @param {string} id Entity id
	 */
	const getUpdateMutation = (input) => {
		const mutationType = 'UPDATE';
		const mutation = getMutation(mutationType);
		const options = getMutationOptions(mutationType, { ...input, id });

		return { mutation, ...options };
	};

	/**
	 *
	 */
	const getDeleteMutation = () => {
		const mutationType = 'DELETE';
		const mutation = getMutation(mutationType);
		const options = getMutationOptions(mutationType, { id });

		return { mutation, ...options };
	};

	/**
	 *
	 */
	const onMutationStart = () => {
		setResult({
			loading: true,
			error: undefined,
			input: undefined,
			called: true,
		});
	};

	/**
	 *
	 */
	const onMutationComplete = (response, onCompleted) => {
		const { input, errors } = response;
		const error = errors && errors.length > 0 ? new ApolloError({ graphQLErrors: errors }) : undefined;

		setResult({
			called: true,
			loading: false,
			input,
			error,
		});

		if (typeof onCompleted === 'function') {
			onCompleted(input);
		}
	};

	/**
	 *
	 */
	const onMutationError = (error, onError) => {
		setResult({
			loading: false,
			error,
			input: undefined,
			called: true,
		});

		if (typeof onError === 'function') {
			onError(error);
		}
	};

	/**
	 *
	 */
	const mutate = (options) => {
		const { onCompleted, onError, ...mutationOptions } = options;
		onMutationStart();
		client
			.mutate(mutationOptions)
			.then((response) => {
				onMutationComplete(response, onCompleted);
				return response;
			})
			.catch((error) => {
				onMutationError(error, onError);
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
