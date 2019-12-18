type EntityTextFieldSearchProps = {
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
const entityTextFieldSearch = ({ entities, searchText }: EntityTextFieldSearchProps) => {
	const isSearchable = searchText && Array.isArray(entities);
	const textToSearch = searchText.toLowerCase();
	const searchResult = entities.filter(({ name: title }) => {
		return title && title.toLowerCase().search(textToSearch) !== -1;
	});

	return isSearchable ? searchResult : entities;
};

export default entityTextFieldSearch;
