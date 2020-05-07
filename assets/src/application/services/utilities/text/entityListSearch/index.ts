import { pick } from 'ramda';

import { Entity } from '@dataServices/types';
import { EntityListSearchProps } from './types';

const entityListSearch = <E extends Entity>({
	entities,
	searchText,
	searchFields,
}: EntityListSearchProps<E>): Array<E> => {
	const isSearchable = searchText?.trim().length && entities?.length && searchFields?.length;

	if (!isSearchable) {
		return entities;
	}

	const textToSearch = searchText.trim().toLowerCase();

	return entities.filter((entity) => {
		// Pick the desired search fields.
		const fields = pick(searchFields as Readonly<string[]>, entity);
		// Get field values.
		const fieldValues: string[] = Object.values(fields);

		// Search the text in field values
		const searchIndex = fieldValues.findIndex((value) => {
			return value && value.toLowerCase().search(textToSearch) !== -1;
		});

		return searchIndex !== -1;
	});
};

export default entityListSearch;
