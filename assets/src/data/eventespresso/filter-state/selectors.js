/**
 * External imports
 */
import createSelector from 'rememo';
import { Map } from 'immutable';

const getStateForContext = ( state, context ) => {
	return typeof state[ context ] === 'undefined' ?
		Map() :
		state[ context ];
};

export const getView = createSelector(
	( state, context ) => {
		return getStateForContext( context ).get( 'view' );
	},
	( state, context ) => [
		getStateForContext( context ).get( 'view' ),
	]
);

export const getPerPage = createSelector(
	( state, context ) => {
		return getStateForContext( context ).get( 'perPage' );
	},
	( state, context ) => [
		getStateForContext( context ).get( 'perPage' ),
	]
);

export const getItemToShowWithValue = createSelector(
	( state, context, itemToShow ) => {
		return getStateForContext( context ).get( itemToShow );
	},
	( state, context, itemToShow ) => [
		getStateForContext( context ).get( 'view', itemToShow ),
	]
);

export const getItemToShow = createSelector(
	( state, context ) => {
		return getStateForContext( context ).get( 'itemToShow' );
	},
	( state, context ) => [
		getStateForContext( context ).get( 'itemToShow' ),
	]
);

export const getIsChained = createSelector(
	( state, context ) => {
		return getStateForContext( context ).get( 'isChained' );
	},
	( state, context ) => [
		getStateForContext( context ).get( 'isChained' ),
	]
);

export const getSortBy = createSelector(
	( state, context ) => {
		return getStateForContext( context ).get( 'sortBy' );
	},
	( state, context ) => [
		getStateForContext( context ).get( 'sortBy' ),
	]
);
