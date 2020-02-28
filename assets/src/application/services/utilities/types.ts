// intersection of two types
export type Intersection<A, B> = {
	[P in keyof A & keyof B]: A[P] | B[P];
};

// merges two types
export type Merge<A, B> = Omit<A, keyof B> & B extends infer O ? { [K in keyof O]: O[K] } : never;

export interface AnyObject {
	[key: string]: any;
}
