import { useState, useEffect } from 'react';
import { mapObjIndexed, pickBy, isEmpty } from 'ramda';

import { AssignmentManager, TAMPossibleRelation, TAMRelationalData, TAMRelationalEntity } from '../types';

const DEFAULT_VALIDATION_DATA: TAMPossibleRelation = {
	datetimes: [],
	tickets: [],
};

const useValidation = (assignmentManager: AssignmentManager): TAMPossibleRelation => {
	const [validationData, setValidationData] = useState(DEFAULT_VALIDATION_DATA);
	const TAMData: TAMRelationalData = assignmentManager.getData();

	useEffect(() => {
		// may be the data is not initialized yet
		if (isEmpty(TAMData)) {
			return;
		}
		// loop through TAM data to find entities with no relations
		// See the data shape, please check the shape of TAMRelationalData
		const newTAMData: TAMPossibleRelation = mapObjIndexed((relationalEntity, entity) => {
			const relation: keyof TAMPossibleRelation = entity === 'datetimes' ? 'tickets' : 'datetimes';
			const emptyRelationalEntities = pickBy<TAMRelationalEntity, TAMRelationalEntity>(
				(relations: TAMPossibleRelation) => {
					const relatedIds = relations?.[relation] || [];
					return relatedIds.length === 0;
				},
				relationalEntity
			);
			return Object.keys(emptyRelationalEntities);
		}, TAMData);
		setValidationData(newTAMData);
	}, [TAMData]);

	return validationData;
};

export default useValidation;
