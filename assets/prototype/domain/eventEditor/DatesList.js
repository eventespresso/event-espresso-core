import { useContext } from '@wordpress/element';
import { DatesListDataContext } from './containers/datesListData/index';

const DatesList = () => {
	const list = useContext( DatesListDataContext );

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
