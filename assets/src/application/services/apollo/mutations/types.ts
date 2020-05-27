export interface MutationInput {
	[key: string]: any;
}

export enum MutationType {
	Create = 'CREATE',
	Update = 'UPDATE',
	Delete = 'DELETE',
}
