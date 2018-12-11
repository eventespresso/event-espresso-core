/**
 * External imports
 */
import { Component } from 'react';
import { EntityList } from '@eventespresso/components';

/**
 * Internal dependencies
 */
import { EditorDatesGridView } from './grid-view/editor-dates-grid-view';
import { EditorDatesListView } from './list-view/editor-dates-list-view';
import { default as PaginatedDatesListWithFilterBar } from './filter-bar';
import './style.css';

/**
 * EditorDatesList
 * EntityList component for displaying event dates in the editor
 *
 * @function
 * @param {Array} entities 	array of JSON objects defining the Event Dates
 * @param {string} view
 * @param {Function} retrieveDates
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Event Dates
 */
class EditorDatesList extends Component {
	render() {
		const { view, ...otherProps } = this.props;
		return (
			<EntityList
				EntityGridView={ EditorDatesGridView }
				EntityListView={ EditorDatesListView }
				view={ view }
				{ ...otherProps }
			/>
		);
	}
}

export default PaginatedDatesListWithFilterBar( EditorDatesList );
