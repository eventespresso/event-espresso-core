import { MutationOptions } from 'apollo-client';
type MutationInput = {
	[key: string]: any;
};
type BackwardSubscription = {
	onCompleted?: () => void;
	onError?: () => void;
};
export interface EntityMutator {
	createEntity: (input: MutationInput, subscriptions?: BackwardSubscription) => void;
	updateEntity: (input: MutationInput, subscriptions?: BackwardSubscription) => void;
	deleteEntity: (input?: MutationInput, subscriptions?: BackwardSubscription) => void;
}

type MutationGetter = (input: MutationInput) => MutationOptions;

type MutationResult = {
	loading: boolean;
	error?: any;
	data?: any;
	called: boolean;
};

export interface EntityMutation {
	getCreateMutation: MutationGetter;
	getUpdateMutation: MutationGetter;
	getDeleteMutation: MutationGetter;
	mutate: (input: MutationOptions) => MutationResult;
}
