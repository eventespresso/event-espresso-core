import React from 'react';
import classNames from 'classnames';
import { EntityId, EntityDbId } from '@dataServices/types';

import './style.scss';

export enum EntityIdAlignment {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface EntityIdProps {
	align?: EntityIdAlignment;
	dbid: EntityDbId;
	guid: EntityId;
}

const EntityIDs: React.FC<EntityIdProps> = React.memo(({ dbid, guid, align = 'left' }) => {
	const className = classNames('ee-entity-ids', 'ee-focus-priority-9', {
		'ee-align-lft': align === EntityIdAlignment.LEFT,
		'ee-align-rgt': align === EntityIdAlignment.RIGHT,
	});

	return (
		<div className={className}>
			<span className={'ee-entity-dbid'}>{dbid}</span>
		</div>
	);
});

export default EntityIDs;
