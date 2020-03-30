import React from 'react';
import { BodyRow, HeaderRow } from '@appLayout/espressoTable';
import { Entity, EntityId } from '@appServices/apollo/types';
import { EntityListFilterStateManager } from './filterBar';
import { LegendConfig } from '@application/ui/display/EntityListLegend/types';
import { TypeName } from '@appServices/apollo/status';
import { EntityListContextProps } from '@edtrServices/context/types';

type ELFSM = EntityListFilterStateManager<any>;

export interface EntityListBaseProps<E extends Entity> {
	entities?: Array<E>;
}

export interface EntityCardListProps<E extends Entity> extends EntityListBaseProps<E> {
	EntityCard: React.ComponentType<EntityListItemProps<E>>;
	loading: boolean;
}

/**
 * This common type can be used/extended by many UI components
 */
export interface EntityListItemProps<E extends Entity> {
	entity: E;
}

export interface EntityListViewProps<E extends Entity, FS extends ELFSM> extends EntityListBaseProps<E> {
	className?: string;
	filterState: FS;
}

interface BodyRowGeneratorFnProps<E extends Entity, FS extends ELFSM> {
	entity: E;
	filterState: FS;
}
export type BodyRowGeneratorFn<E extends Entity, FS extends ELFSM> = (props: BodyRowGeneratorFnProps<E, FS>) => BodyRow;
export type HeaderRowGeneratorFn<FS extends ELFSM> = (filerState: FS) => HeaderRow;

export interface EntityTableProps<E extends Entity, FS extends ELFSM> extends EntityListViewProps<E, FS> {
	bodyRowGenerator: BodyRowGeneratorFn<E, FS>;
	headerRowGenerator: HeaderRowGeneratorFn<FS>;
	tableCaption?: string;
	tableId?: string;
}

export type EntityListComponent<E extends Entity, FS extends ELFSM> = React.ComponentType<EntityListViewProps<E, FS>>;

export interface EntityListProps<E extends Entity, FS extends ELFSM> extends EntityListViewProps<E, FS> {
	CardView: EntityListComponent<E, FS>;
	context: EntityListContextProps<E, FS>;
	domain: string;
	entityType: TypeName;
	filterState: FS;
	footer: React.ReactNode;
	headerText: string;
	legendConfig: LegendConfig;
	listId: string;
	loadingText?: string;
	noResultsDesc?: string;
	noResultsTitle?: string;
	TableView: EntityListComponent<E, FS>;
}
