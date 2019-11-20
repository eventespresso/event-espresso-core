import { createContext, useReducer, useEffect, useState } from '@wordpress/element';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';
import gql from 'graphql-tag';

export const DateCardDataContext = createContext();

const GET_DATE = gql`
	query getDatetimes($eventId: Number) {
  		datetimes(where: $eventId) {
    		edges {
				node {
					id
					name
					description
					sold
					reserved
					order
					startDate
					endDate
					startTime
					endTime
				}
			}
		}
	}
`;

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'SET_FIELD_VALUE':
			return {
				...state,
				[ action.field ]: action.value
			};
	}
};

const useDateCardData = ( { children, eventId } ) => {
	const { data } = useQuery( GET_DATE, {
		variables: { eventId },
	} );
	const datetimes = get( data, [ 'eventBy', 'datetimes', 'nodes' ] );

	const [ state, dispatch ] = useReducer(
		reducer,
		datetimes
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

	return (
		<DateCardDataContext.Provider value={ contextValue }>
			{ children }
		</DateCardDataContext.Provider>
	);
};

export default useDateCardData;
