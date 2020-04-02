import React from 'react';

import EntityPaperFrame from '../EntityPaperFrame';
import { EntityCardProps } from './types';
import { getPropsAreEqual } from '@appServices/utilities';
import './styles.scss';

const EntityCard: React.FC<EntityCardProps> = ({ cacheId, actionsMenu, details, entity, sidebar, reverse = false }) => {
	const layout = reverse ? 'entity-card entity-card--reverse-layout' : 'entity-card';

	return (
		<EntityPaperFrame cacheId={cacheId} className={'ee-entity-card-wrapper ee-fade-in'} entity={entity}>
			<div className={layout}>
				<div className={'entity-card__sidebar'}>{sidebar}</div>
				<div className={'entity-card__details-wrapper'}>
					<div className={'entity-card__details'}>{details}</div>
				</div>
				<div className={'entity-card__menu'}>{actionsMenu}</div>
			</div>
		</EntityPaperFrame>
	);
};

export default React.memo(EntityCard, getPropsAreEqual(['cacheId']));
