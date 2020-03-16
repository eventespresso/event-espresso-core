import React from 'react';
import { Entity, EntityId } from '@appServices/apollo/types';
import { TypeName } from '@appServices/apollo/status';
import { EntityListFilterStateManager } from './filterBar';

type ELFSM = EntityListFilterStateManager<any>;

export interface EntityCardListProps<E extends Entity> {
	EntityCard: React.ComponentType<EntityListItemProps>;
	entities: Array<E>;
}

/**
 * This common type can be used/extended by many UI components
 */
export interface EntityListItemProps {
	id: EntityId;
}

export interface EntityListViewProps<E extends Entity, FS extends ELFSM> {
	className?: string;
	entities: Array<E>;
	filterState: FS;
}

export type EntityListComponent<E extends Entity, FS extends ELFSM> = React.ComponentType<EntityListViewProps<E, FS>>;

export interface EntityListProps<E extends Entity, FS extends ELFSM> extends EntityListViewProps<E, FS> {
	CardView: EntityListComponent<E, FS>;
	domain: string;
	entityType: TypeName;
	footer: React.ReactNode;
	headerText: string;
	listId: string;
	loadingText?: string;
	noResultsDesc?: string;
	noResultsTitle?: string;
	TableView: EntityListComponent<E, FS>;
}
