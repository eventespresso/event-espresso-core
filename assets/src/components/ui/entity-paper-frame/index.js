/**
 * External imports
 */
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';

/**
 * EntityPaperFrame
 * adds a styled frame that gives the appearance
 * of a piece of paper on a surface
 *
 * @return {Object} Entity with added EntityPaperFrame
 */
const EntityPaperFrame = ( { instanceId, children } ) => {
	return (
		<div id={ `ee-entity-paper-frame-${ instanceId }` }
			 className="ee-entity-paper-frame-wrapper"
		>
			<div className="ee-entity-paper-frame">
			</div>
			<div className="ee-entity-wrapper">
				{ children }
			</div>
		</div>
	);
};

export default withInstanceId( EntityPaperFrame );
