export type EntityId = string;

export type EntityDbId = number;

export interface Entity {
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
