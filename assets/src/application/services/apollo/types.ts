export type EntityId = string;

export type EntityDbId = number;

export interface Cacheable {
	cacheId: string;
}

export interface Entity extends Cacheable {
	id: EntityId;
	dbId: EntityDbId;
	name: string;
	__typename?: string;
}

export interface Trashable {
	isTrashed: boolean;
}

export interface EntityEdge<E = Entity, ConnectionTypeName = string> {
	nodes: E[];
	__typename: ConnectionTypeName;
}
