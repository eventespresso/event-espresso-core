import React from 'react';
import { Entity, EntityId } from '@appServices/apollo/types';
import { TypeName } from '@appServices/apollo/status';

export interface CardListProps<T extends Entity> extends EntityListComponentProps<T> {
	CardView: React.JSXElementConstructor<CardViewProps>;
}

export interface CardViewProps {
	id: EntityId;
}

export interface EntityListComponentProps<T extends Entity> {
	entities: T[];
	className?: string;
}

export interface EntityListProps<T extends Entity> extends EntityListComponentProps<T> {
	CardView: React.JSXElementConstructor<CardViewProps>;
	TableView: React.JSXElementConstructor<EntityListComponentProps<T>>;
	entityFilters: JSX.Element;
	entityType: TypeName;
	footer: JSX.Element;
	headerText: string;
	listId: string;
	loadingText?: string;
	noResultsTitle?: string;
	noResultsDesc?: string;
}
