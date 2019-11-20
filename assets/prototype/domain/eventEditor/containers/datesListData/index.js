import { createContext, useReducer, useEffect, useState } from '@wordpress/element';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';

const GET_DATETIMES = gql`
	query getEventData($eventId: Int!) {
		eventBy(eventId: $eventId) {
			datetimes {
					nodes {
					id
					name
					description
					sold
					reserved
					order
					start
					end
					length
					startDate
					endDate
					startTime
					endTime
					capacity
					isPrimary
					isSoldOut
					isUpcoming
					isActive
					isExpired
				}
			}
		}
	}
`;

const DEFAULT_STATE = {
	datetimes: [],
};

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'setDatetimes':
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
	const { data } = useQuery( GET_DATETIMES, {
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

		dispatch( {
			type: 'setDatetimes',
			payload: data
		} );

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [] );

	const datetimes = get( data, [ 'eventBy', 'datetimes', 'nodes' ] );

	return (
		<DatesListDataContext.Provider value={ datetimes }>
			{ children }
		</DatesListDataContext.Provider>
	);
};
