import { Entity, EntityId } from '@appServices/apollo/types';
import { EntityListFilterStateManager } from '@appLayout/entityList';

type ELFSM = EntityListFilterStateManager<any>;

export interface EntityContextProps {
	id: EntityId;
}

export interface EntityListContextProps<FS extends ELFSM, E extends Entity> {
	filterState: FS;
	filteredEntities: Array<E>;
}
