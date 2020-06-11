import { useCallback } from 'react';

import { useRelations } from '@application/services/apollo/relations';
import { isDefaultTax } from '@sharedEntities/prices/predicates/selectionPredicates';
import { EntityId } from '@dataServices/types';
import { TpcPriceModifier } from '../types';

/**
 * Default tax needs to be removed only from ticket relations
 */
const useRemoveDefaultTax = (ticketId: EntityId) => {
	const { removeRelation } = useRelations();

	return useCallback(
		(price: TpcPriceModifier) => {
			// if it's a default tax and we are editing an existing ticket, not creating a new one
			// why would we remove a relation that does not exist ¯\_(ツ)_/¯
			if (isDefaultTax(price) && ticketId) {
				removeRelation({
					entity: 'tickets',
					entityId: ticketId,
					relation: 'prices',
					relationId: price.id,
				});
			}
		},
		[removeRelation, ticketId]
	);
};

export default useRemoveDefaultTax;
