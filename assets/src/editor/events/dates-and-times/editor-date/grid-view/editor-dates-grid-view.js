/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { default as EditorDateGridItem } from './editor-date-grid-item';
import './editor-dates-grid-view.css';

/**
 * EditorDatesGridView
 * Displays dates as mobile/finger friendly blocks
 * with the most relevant info visible
 *
 * @function
 * @param {Array} entities    array of JSON objects defining the Event Dates
 * @param {string} htmlClass
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Event Dates
 */
export const EditorDatesGridView = ( {
	entities,
	htmlClass,
	...otherProps
} ) => {
	// console.log( '' );
	// console.log( 'EditorDatesGridView showVenue', showVenue );
	htmlClass = htmlClass ?
		`${ htmlClass } ee-dates-list-grid-view` :
		'ee-dates-list-grid-view';
	return (
		<div className={ htmlClass }>
			{
				entities.map(
					function( eventDate ) {
						return isModelEntityOfModel( eventDate, 'datetime' ) ? (
							<EditorDateGridItem
								key={ eventDate.id }
								eventDate={ eventDate }
								{ ...otherProps }
							/>
						) : null;
					}
				)
			}
		</div>
	);
};
