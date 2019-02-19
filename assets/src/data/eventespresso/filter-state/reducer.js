import { Map } from 'immutable';

const DEFAULT_STATE = {};

const getStateForContext = ( state, context ) => {
	return typeof state[ context ] === 'undefined' ?
		Map() :
		state[ context ];
};

const filterStateReducer = ( state = DEFAULT_STATE, action ) => {
	const { type, context } = action;
	switch ( type ) {
		case 'SET_PER_PAGE':
			return getStateForContext( context )
				.set( 'perPage', action.perPage );
		case 'SET_VIEW':
			return getStateForContext( context )
				.set( 'view', action.view );
		case 'SET_ITEM_TO_SHOW_WITH_VALUE':
			return getStateForContext( context )
				.set( action.itemToShow, action.value );
		case 'SET_ITEM_TO_SHOW':
			return getStateForContext( context )
				.set( 'itemToShow', action.itemToShow );
		case 'SET_IS_CHAINED':
			return getStateForContext( context )
				.set( 'isChained', action.isChained );
		case 'SET_SORT_BY':
			return getStateForContext( context )
				.set( 'sortBy', action.sortBy );
	}
	return state;
};

export default filterStateReducer;
