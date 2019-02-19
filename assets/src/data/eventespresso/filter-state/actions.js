export function setPerPage( context, perPage ) {
	return {
		type: 'SET_PER_PAGE',
		perPage: parseInt( perPage ),
		context,
	};
}

export function setListView( context ) {
	return {
		type: 'SET_VIEW',
		view: 'list',
		context,
	};
}

export function setGridView( context ) {
	return {
		type: 'SET_VIEW',
		view: 'grid',
		context,
	};
}

export function setItemToShowWithValue( context, itemToShow, value ) {
	return {
		type: 'SET_ITEM_TO_SHOW_WITH_VALUE',
		context,
		itemToShow,
		value,
	};
}

export function setItemToShow( context, itemToShow ) {
	return {
		type: 'SET_ITEM_TO_SHOW',
		context,
		itemToShow,
	};
}

export function setIsChained( context, isChained ) {
	return {
		type: 'SET_IS_CHAINED',
		context,
		isChained,
	};
}

export function setSortBy( context, sortBy ) {
	return {
		type: 'SET_SORT_BY',
		context,
		sortBy,
	};
}
