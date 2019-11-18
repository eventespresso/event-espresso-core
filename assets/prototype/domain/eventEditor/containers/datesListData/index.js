import { createContext, useReducer, useEffect, useState } from '@wordpress/element';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_DOGS = gql`
	query getEventData($eventId: Number!) {
		eventBy(eventId: $eventId) {
			name
		}
	}
`;

const DEFAULT_STATE = {
	datetimes: [],
};

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'setDatetimes':
			console.log( 'action.payload', action.payload );
			return { datetimes: action.payload };
		case 'add':
			return { todoList: [ ...state.todoList, action.payload ] };
	}
};

export const DatesListDataContext = createContext( {
	state: DEFAULT_STATE,
	dispatch: () => {},
} );

export const DatesListData = ( { children, eventId } ) => {
	const { loading, error, data } = useQuery( GET_DOGS, {
		variables: { eventId },
	} );

	const [ state, dispatch ] = useReducer(
		reducer,
		DEFAULT_STATE
	);

	const [ contextValue, setContextValue ] = useState( {
		state,
		dispatch,
	} );

	// Update context value and trigger re-render
	// This patterns avoids unnecessary deep renders
	// https://reactjs.org/docs/context.html#caveats
	useEffect( () => {
		// eslint-disable-next-line no-shadow
		setContextValue( ( contextValue ) => ( {
			...contextValue,
			state
		} ) );
	}, [ state ] );

	// Verify user is logged-in on AuthProvider mount
	// Avoids storing sensitive data in local storage
	useEffect( () => {
		// eslint-disable-next-line curly
		// if ( loading ) return 'Loading...';
		// eslint-disable-next-line curly
		// if ( error ) return `Error! ${ error.message }`;

		console.log( { data } );

		dispatch( {
			type: 'setDatetimes',
			payload: data
		} );

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	return (
		<DatesListDataContext.Provider value={ contextValue }>
			{ children }
		</DatesListDataContext.Provider>
	);
};
