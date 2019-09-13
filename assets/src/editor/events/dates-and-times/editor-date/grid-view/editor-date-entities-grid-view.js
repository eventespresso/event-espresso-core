/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import EditorDateEntityGridItem from './editor-date-entity-grid-item';
import './editor-date-entities-grid-view.css';

/**
 * EditorDateEntitiesGridView
 * Displays dates as mobile/finger friendly blocks
 * with the most relevant info visible
 *
 * @function
 * @param {Array} entities    array of JSON objects defining the Event Dates
 * @param {string} htmlClass
 * @param {mixed} otherProps
 * @return {Component}          list of rendered Event Dates
 */
const EditorDateEntitiesGridView = ( {
	entities,
	htmlClass,
	...otherProps
} ) => {
	htmlClass = classNames( htmlClass, 'ee-dates-list-grid-view' );
	return (
		<div className={ htmlClass }>
			{
				entities.map(
					function( dateEntity ) {
						return isModelEntityOfModel( dateEntity, 'datetime' ) ?
							(
								<EditorDateEntityGridItem
									{ ...otherProps }
									key={ dateEntity.id }
									dateEntity={ dateEntity }
								/>
							) :
							null;
					}
				)
			}
		</div>
	);
};

export default EditorDateEntitiesGridView;
