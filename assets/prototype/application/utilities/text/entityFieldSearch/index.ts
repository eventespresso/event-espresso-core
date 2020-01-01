/**
 * External dependencies
 */
import { trim } from 'ramda';

type EntityFieldSearchProps = {
	entities: any[];
	searchText: string;
	field?: string;
};

/**
 * searches through provided list of entities and returns an array
 * of entities where the set field (defaults to entity name)
 * matches the current search text (fully or partially)
 *
 * @param {BaseEntity[]} entities
 * @param {string} searchText
 * @param {string} field
 * @return {BaseEntity[]} entities matching search criteria
 */
const entityFieldSearch = ({ entities, searchText }: EntityFieldSearchProps) => {
	const isSearchable = searchText && trim(searchText).length && Array.isArray(entities) && entities.length;
	const textToSearch = trim(searchText).toLowerCase();
	const searchResult =
		isSearchable &&
		entities.filter(({ name: title }) => {
			return title && title.toLowerCase().search(textToSearch) !== -1;
		});

	return isSearchable ? searchResult : entities;
};

export default entityFieldSearch;
