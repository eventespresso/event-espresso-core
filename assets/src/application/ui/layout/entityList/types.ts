import React from 'react';
import { Entity, EntityId } from '@appServices/apollo/types';
import { TypeName } from '@appServices/apollo/status';
import { EntityListFilterStateManager } from './filterBar';

export interface CardListProps<T extends Entity> extends EntityListComponentProps<T> {
	CardView: React.JSXElementConstructor<CardViewProps>;
}

export interface CardViewProps {
	id: EntityId;
}

export interface EntityListComponentProps<T extends Entity> {
	className?: string;
	entities: T[];
}

export interface EntityListProps<T extends Entity, ELFS = EntityListFilterStateManager>
	extends EntityListComponentProps<T> {
	CardView: React.JSXElementConstructor<CardViewProps>;
	domain: string;
	entityType: TypeName;
	filterState: ELFS;
	footer: JSX.Element;
	headerText: string;
	listId: string;
	loadingText?: string;
	noResultsDesc?: string;
	noResultsTitle?: string;
	TableView: React.JSXElementConstructor<EntityListComponentProps<T>>;
}
