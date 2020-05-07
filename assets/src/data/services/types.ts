export type EntityId = string;

export type EntityDbId = number;

export interface Cacheable {
	cacheId: string;
}

export interface Entity extends Cacheable {
	id: EntityId;
	dbId: EntityDbId;
	__typename?: string;
}

export interface Trashable {
	isTrashed: boolean;
}

export interface EntityEdge<E = Entity, ConnectionTypeName = string> {
	nodes: E[];
	__typename: ConnectionTypeName;
}

export interface Address {
	address?: string;
	address2?: string;
	city?: string;
	country?: string;
	state?: string;
	zip?: string;
}
