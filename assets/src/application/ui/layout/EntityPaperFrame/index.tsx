import React from 'react';
import classNames from 'classnames';

import EntityIDs from '@appDisplay/EntityIDs';
import { getPropsAreEqual } from '@appServices/utilities';
import { Entity } from '@dataServices/types';
import './style.css';

interface EntityPaperFrameProps {
	cacheId?: string;
	children: React.ReactNode;
	className?: string;
	entity: Entity;
}

/**
 * EntityPaperFrame
 * adds a styled frame that gives the appearance
 * of a piece of paper on a surface
 */
const EntityPaperFrame: React.FC<EntityPaperFrameProps> = ({ children, className, entity }) => {
	const htmlClassName = classNames(className, 'ee-entity-paper-frame-wrapper');
	return (
		<div id={`ee-entity-paper-frame-${entity.id}`} className={htmlClassName}>
			<EntityIDs dbid={entity.dbId} guid={entity.id} />
			<div className='ee-entity-paper-frame'>
				<div className='ee-entity-inner-wrapper'>{children}</div>
			</div>
		</div>
	);
};

export default React.memo(EntityPaperFrame, getPropsAreEqual(['cacheId']));
