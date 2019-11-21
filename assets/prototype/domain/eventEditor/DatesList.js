import useDatesListData from './containers/useDatesListData';

const DatesList = ( { eventId } ) => {
	const list = useDatesListData( eventId );

	return list ? (
		<ul>
			{ list.map( ( { id, name } ) => (
				<li key={ id }>
					{ name }
				</li>
			) ) }
		</ul>
	) : null;
};

export default DatesList;
