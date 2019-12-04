import { useEffect, useState } from '@wordpress/element';
import { Button, MenuItem } from '@blueprintjs/core/lib/esm';
import { MultiSelect } from '@blueprintjs/select';

const transformRelatedItemsArrayToObject = (items) =>
	items.reduce((relatedItems, relatedItem) => {
		relatedItems[relatedItem.id] = relatedItem;

		return relatedItems;
	}, {});

/**
 * @function
 * @param {Array} items array of items to select from
 * @param {string} itemType item relation name
 * @param {Array} displayFields primary and secondary fields to use for item tag
 * @param {Function[]} formatFields callbacks for formatting the primary and secondary fields
 * @param {string} placeholder label displayed in select input
 * @param {Function} onChange callback to execute when value changes
 * @param {boolean} formReset flag indicating that input needs to be reset because form has been reset
 * @param {Object} rest
 * @return {node} rendered multi-select input
 */
const RelationsSelector = ({
	defaultRelatedItems = [],
	items = [],
	itemType = '',
	displayFields = [],
	formatFields = [],
	placeholder = 'assign relations',
	onChange = () => null,
	formReset = false,
	...rest
}) => {
	const [relatedItems, setRelatedItems] = useState(defaultRelatedItems);

	const relatedItemsObject = transformRelatedItemsArrayToObject(items);

	// clear related items
	useEffect(() => {
		if (formReset) {
			reset();
		}
	});

	/**
	 * @function
	 * @param {Array} relations
	 */
	const updateRelatedItems = (relations) => {
		onChange(relations);
		setRelatedItems(relations);
	};

	/**
	 * @function
	 */
	const reset = () => {
		updateRelatedItems([]);
	};

	/**
	 * @function
	 * @param {Object} relatedItem
	 * @return {string} value for primary field if it exists
	 */
	const primaryField = (relatedItem) => {
		return relatedItem[displayFields[0]] ? relatedItem[displayFields[0]] : '';
	};

	/**
	 * @function
	 * @param {string} primary
	 * @param {boolean} format
	 * @param {boolean} toString
	 * @return {string} value for primary field if it exists
	 */
	const formatPrimaryField = (primary, format = true, toString = false) => {
		return format && typeof formatFields[0] === 'function' ? formatFields[0](primary, toString) : primary;
	};

	/**
	 * @function
	 * @param {Object} relatedItem
	 * @return {string} value for secondary field if it exists
	 */
	const secondaryField = (relatedItem) => {
		return relatedItem[displayFields[1]] ? relatedItem[displayFields[1]] : '';
	};

	/**
	 * @function
	 * @param {string} secondary
	 * @param {boolean} format
	 * @param {boolean} toString
	 * @return {string} value for primary field if it exists
	 */
	const formatSecondaryField = (secondary, format = true, toString = false) => {
		return format && typeof formatFields[1] === 'function' ? formatFields[1](secondary, toString) : secondary;
	};

	/**
	 * @function
	 * @param {Object} relatedItem
	 * @return {boolean} true if relation exists
	 */
	const hasRelation = (relatedItemId) => {
		return relatedItems.some((element) => element === relatedItemId);
	};

	/**
	 * add or remove relation depending if one already exists
	 *
	 * @function
	 * @param {Object} relatedItem
	 */
	const handleRelation = (relatedItem) => {
		if (hasRelation(relatedItem)) {
			removeRelation(relatedItem);
		} else {
			assignRelation(relatedItem);
		}
	};

	/**
	 * add relation
	 *
	 * @function
	 * @param {Object} relatedItem
	 */
	const assignRelation = (relatedItem) => {
		const newItems = [...relatedItems, relatedItem.id];
		updateRelatedItems(newItems);
	};

	/**
	 * remove relation
	 *
	 * @function
	 * @param {Object} relatedItem
	 */
	const removeRelation = (relatedItem) => {
		const itemId = relatedItem.id ? relatedItem.id : relatedItem;
		const newItems = relatedItems.filter((id) => id !== itemId);
		updateRelatedItems(newItems);
	};

	/**
	 * @function
	 * @param {Object} relatedItem
	 * @param {boolean} format
	 * @param {string} primary field to use for item tag
	 * @param {string} secondary field to use for item tag
	 * @return {string} item tag that appears in select box
	 */
	const renderItemTag = (itemId, format = true, primary = '', secondary = '') => {
		const relatedItem = relatedItemsObject[itemId];

		primary = primary ? primary : primaryField(relatedItem);
		primary = formatPrimaryField(primary, format, true);
		secondary = secondary ? secondary : secondaryField(relatedItem);
		secondary = formatSecondaryField(secondary, format, true);
		return `${itemId}) ${primary} : ${secondary}`;
	};

	/**
	 * @function
	 * @param {string} query text to search for
	 * @param {Object} relatedItem
	 * @param {number} index
	 * @param {boolean} exactMatch
	 * @return {boolean} true if query matches any part of
	 *                   primary or secondary item fields
	 */
	const itemSearchCompare = (query, relatedItem, index, exactMatch) => {
		const normalizedQuery = query.toString().toLowerCase();
		const primary = primaryField(relatedItem)
			.toString()
			.toLowerCase();
		const secondary = secondaryField(relatedItem)
			.toString()
			.toLowerCase();
		const itemTag = renderItemTag(relatedItem, false, primary, secondary);
		return exactMatch ? itemTag === normalizedQuery : itemTag.indexOf(normalizedQuery) > -1;
	};

	/**
	 * @function
	 * @param {string} tag
	 * @param {number} index
	 */
	const handleTagRemove = (tag, index) => {
		const relatedItem = relatedItems[index];
		if (relatedItem) {
			removeRelation(relatedItem);
		}
	};

	/**
	 * @function
	 * @param {Object} relatedItem
	 * @return {node} render select option
	 */
	const renderOption = (relatedItemId) => {
		const relatedItem = relatedItemsObject[relatedItemId];

		const { dbId = '' } = relatedItem;
		let primary = primaryField(relatedItem);
		primary = formatPrimaryField(primary);
		let secondary = secondaryField(relatedItem);
		secondary = formatSecondaryField(secondary);
		const text = `${dbId}) ${primary}`;

		return (
			<MenuItem
				key={relatedItemId}
				text={text}
				label={secondary}
				onClick={() => handleRelation(relatedItem)}
				icon={hasRelation(relatedItem) ? 'tick' : 'blank'}
				shouldDismissPopover={false}
			/>
		);
	};

	const clearButton = relatedItems.length > 0 ? <Button icon='cross' onClick={reset} minimal /> : undefined;
	const onItemSelect = (itemId) => handleRelation(relatedItemsObject[itemId]);
	const selectedItems = Object.keys(relatedItemsObject).filter((item) => hasRelation(item));
	const tagInputProps = {
		tagProps: { minimal: true },
		onRemove: handleTagRemove,
		rightElement: clearButton,
	};

	return (
		<MultiSelect
			{...rest}
			fill
			items={Object.keys(relatedItemsObject)}
			itemRenderer={renderOption}
			itemPredicate={itemSearchCompare}
			noResults={<MenuItem disabled text={'no results'} />}
			onItemSelect={onItemSelect}
			placeholder={placeholder}
			resetOnQuery={false}
			selectedItems={selectedItems}
			tagInputProps={tagInputProps}
			tagRenderer={(relatedItem) => renderItemTag(relatedItem)}
		/>
	);
};

export default RelationsSelector;
