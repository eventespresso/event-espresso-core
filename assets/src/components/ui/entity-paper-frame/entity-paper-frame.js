/**
 * External imports
 */
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.css';
import EntityCuid from './entity-cuid';

/**
 * EntityPaperFrame
 * adds a styled frame that gives the appearance
 * of a piece of paper on a surface
 *
 * @return {Object} Entity with added EntityPaperFrame
 */
const EntityPaperFrame = ( { instanceId, children, entityID } ) => {
	return (
		<div
			id={ `ee-entity-paper-frame-${ instanceId }` }
			className="ee-entity-paper-frame-wrapper"
		>
			<EntityCuid entityID={ entityID }/>
			<div className="ee-entity-paper-frame">
			</div>
			<div className="ee-entity-wrapper">
				{ children }
			</div>
		</div>
	);
};

export default withInstanceId( EntityPaperFrame );
