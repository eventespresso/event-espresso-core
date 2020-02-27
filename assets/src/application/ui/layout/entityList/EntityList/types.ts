import { Entity } from '@appServices/apollo/types';

export interface EntityListComponentProps<T extends Entity> {
	entities: T[];
	className?: string;
}

export interface EntityListProps<T extends Entity> extends EntityListComponentProps<T> {
	EntityGridView: React.JSXElementConstructor<EntityListComponentProps<T>>;
	EntityListView: React.JSXElementConstructor<EntityListComponentProps<T>>;
	entityFilters: JSX.Element;
	listId?: string;
	noResultsText?: string;
}
