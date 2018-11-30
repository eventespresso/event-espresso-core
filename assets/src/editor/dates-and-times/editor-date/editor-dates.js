/**
 * External imports
 */
import { EntityList } from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { EditorDatesGridView } from './grid-view/editor-dates-grid-view';
import { EditorDatesListView } from './list-view/editor-dates-list-view';
import { default as PaginatedDatesListWithFilterBar } from './filter-bar';
import './style.css';

/**
 * EditorDates
 * EntityList component for displaying event dates in the editor
 *
 * @function
 * @param {Array} eventDates 	array of JSON objects defining the Event Dates
 * @param {string} view
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Event Dates
 */
const EditorDates = ( { view, ...otherProps } ) => {
	// console.log( '' );
	// console.log( 'EditorDates view:', view );
	// console.log( 'EditorDates otherProps:', otherProps );
	const htmlClass = view === 'grid' ?
		'ee-editor-event-dates-list' :
		'ee-editor-event-dates-list';
	return (
		<EntityList
			htmlClass={ htmlClass }
			EntityGridView={ EditorDatesGridView }
			EntityListView={ EditorDatesListView }
			view={ view }
			{ ...otherProps }
		/>
	);
};

export default PaginatedDatesListWithFilterBar( EditorDates );
