import { useReducer, useEffect } from '@wordpress/element';

const useDatesListFilterManager = ({ datetimes }) => {
	const initialState = { datetimes, view: 'list' };
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		console.log('useDatesListFilterManager >>>', state);
	}, [state]);

	const setListView = () => {
		dispatch({
			type: 'SET_VIEW',
			view: 'list',
		});
	};

	const setGridView = () => {
		dispatch({
			type: 'SET_VIEW',
			view: 'grid',
		});
	};

	return {
		setListView,
		setGridView,
	};
};

const reducer = (state, action) => {
	const { view } = action;

	switch (action.type) {
		case 'SET_VIEW':
			return { ...state, view };

		default:
			throw new Error('Unexpected action');
	}
};

export default useDatesListFilterManager;
