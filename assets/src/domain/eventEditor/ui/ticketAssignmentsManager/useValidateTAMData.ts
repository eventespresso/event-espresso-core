import { useState, useEffect } from 'react';
import { mapObjIndexed, pickBy, pathOr } from 'ramda';

import { RelationalData, RelationalEntity, PossibleRelation } from '@appServices/apollo/relations';

const DEFAULT_VALIDATION_DATA: PossibleRelation = {
	datetimes: [],
	tickets: [],
};

const useValidateTAMData = (assignmentManager) => {
	const [validationData, setValidationData] = useState(DEFAULT_VALIDATION_DATA);
	const TAMData: RelationalData = assignmentManager.getData();

	useEffect(() => {
		// loop through TAM data to find entities with no relations
		// See the data shape, please check the shape of RelationalData
		const newTAMData: PossibleRelation = mapObjIndexed((relationalEntity, entity) => {
			const relation: keyof PossibleRelation = entity === 'datetimes' ? 'tickets' : 'datetimes';
			const emptyRelationalEntities = pickBy<RelationalEntity, RelationalEntity>(
				(relations: PossibleRelation) => {
					const relatedIds = pathOr<Array<string>>([], [relation], relations);
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

export default useValidateTAMData;
