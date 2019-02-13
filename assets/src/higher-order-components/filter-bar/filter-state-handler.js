/**
 * Internal dependencies
 */
import { default as Listeners } from '../../eejs/utils/observer';

/**
 * @param {Object} state
 */
let state = {};

/**
 * @param {Object} setters
 */
let setters = {};

/**
 * @param {Array} actions
 */
const actions = [];

/**
 * @param {Array} reducers
 */
const reducers = [];

/**
 * @param {Object} listeners
 */
const listeners = new Listeners();

/**
 * @function
 * @return {Array} actions
 */
const resolveSetters = () => {
	// object keys are the setter function names
	const keys = Object.keys( setters );
	for ( let i = 0; i < keys.length; i++ ) {
		const name = keys[ i ];
		const setter = setters[ name ];
		if ( typeof setter === 'function' && actions.indexOf( name ) === -1 ) {
			// create callback for resolving action
			actions[ name ] = function() {
				// cycle thru all stored reducers
				reducers.forEach( reducer => {
					const action = setter.apply( null, arguments );
					// pass action object to reducer
					const newState = reducer( action, state );
					// state will only be updated when correct reducer is found
					if ( newState !== state ) {
						// update state
						state = { ...state, ...newState };
						// notify listeners who can then update themselves
						listeners.notify( state );
					}
				} );
				return state;
			};
		}
	}
	return actions;
};

/**
 * @function
 * @param {Object} filterStateHandler
 * @param {Object} initialState
 * @return {Object} the resolved FilterStateHandler
 */
const register = (
	filterStateHandler,
	initialState,
) => {
	if ( typeof filterStateHandler !== 'object' || filterStateHandler === null ) {
		throw new TypeError( 'filterStateHandler must be an object.' );
	}
	if ( typeof initialState !== 'object' || initialState === null ) {
		throw new TypeError( 'initialState must be an object.' );
	}
	if ( ! filterStateHandler.hasOwnProperty( 'setters' ) ) {
		throw new TypeError( 'filterStateHandler has no setters!' );
	}
	if ( ! filterStateHandler.hasOwnProperty( 'reducer' ) ) {
		throw new TypeError( 'filterStateHandler has no reducer!' );
	}
	// merge incoming setters and add reducer
	setters = { ...setters, ...filterStateHandler.setters };
	reducers.push( filterStateHandler.reducer );
	// merge incoming default state
	state = { ...state, ...initialState };
	// resolve actions from setters
	const actionSetters = resolveSetters();
	return { ...state, ...actionSetters };
};

/**
 * @function
 * @param {Function} onUpdate
 */
const addListener = onUpdate => {
	if ( typeof onUpdate === 'function' ) {
		listeners.subscribe( onUpdate );
	}
};

/**
 * @function
 * @param {Function} onUpdate
 */
const removeListener = onUpdate => {
	if ( typeof onUpdate === 'function' ) {
		listeners.unsubscribe( onUpdate );
	}
};

export {
	register,
	addListener,
	removeListener,
};

const filterStateHandler = {
	register,
	addListener,
	removeListener,
};

export default filterStateHandler;
