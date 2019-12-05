import { useApolloClient } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';
import { useState } from '@wordpress/element';

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
		const mutaton = `${mutationType}_${type.toUpperCase()}`;
		return mutations[mutaton];
	};

	/**
	 * @param {string} mutation Type of mutation
	 * @param {object} data     Mutation data
	 */
	const getMutationOptions = (mutationType, data = {}) => {
		// e.g. "datetmeMutator"
		const key = `${type.toLowerCase()}Mutator`;
		const { [key]: mutator } = mutators;
		const { variables, optimisticResponse, update } = mutator(mutationType, data);

		return { variables, optimisticResponse, update };
	};

	/**
	 * @param {object} data
	 */
	const getCreateMutation = (data) => {
		const mutationType = 'CREATE';
		const mutation = getMutation(mutationType);
		const options = getMutationOptions(mutationType, data);

		return { mutation, ...options };
	};

	/**
	 * @param {string} id Entity id
	 */
	const getUpdateMutation = (data) => {
		const mutationType = 'UPDATE';
		const mutation = getMutation(mutationType);
		const options = getMutationOptions(mutationType, { ...data, id });

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
			data: undefined,
			called: true,
		});
	};

	/**
	 *
	 */
	const onMutationComplete = (response, onCompleted) => {
		const { data, errors } = response;
		const error = errors && errors.length > 0 ? new ApolloError({ graphQLErrors: errors }) : undefined;

		setResult({
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
	const onMutationError = (error, onError) => {
		setResult({
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
