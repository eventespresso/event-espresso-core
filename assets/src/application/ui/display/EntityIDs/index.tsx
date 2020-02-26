import classNames from 'classnames';
import React, { useMemo } from 'react';
import shortenGuid from '@appServices/utilities/text/shortenGuid';
import { EntityId, EntityDbId } from '@appServices/apollo/types';

import './style.css';

export enum EntityIdAlignment {
	LEFT = 'left',
	RIGHT = 'right',
}

export interface EntityIdProps {
	align?: EntityIdAlignment;
	dbid: EntityDbId;
	guid: EntityId;
}

const EntityIDs: React.FC<EntityIdProps> = ({ dbid, guid, align = 'left' }) => {
	const htmlClass = classNames('ee-entity-ids', 'ee-focus-priority-9', {
		'ee-align-lft': align === EntityIdAlignment.LEFT,
		'ee-align-rgt': align === EntityIdAlignment.RIGHT,
	});
	return useMemo(
		() => (
			<div className={htmlClass}>
				<span className={'ee-entity-dbid'}>{dbid}</span>
				<span className={'ee-entity-id-separator'}>{':'}</span>
				<span className={'ee-entity-guid'}>{shortenGuid(guid)}</span>
			</div>
		),
		[dbid, guid, align]
	);
};

export default EntityIDs;
