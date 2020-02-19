import React from 'react';

import EntityPaperFrame from '../EntityPaperFrame';
import { EntityCardProps } from './types';
import './styles.scss';

const EntityCard: React.FC<EntityCardProps> = ({ actionsMenu, details, entity, sidebar, reverse = false }) => {
	const layout = reverse ? 'entity-card entity-card--reverse-layout' : 'entity-card';
	return (
		<EntityPaperFrame entity={entity}>
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

export default EntityCard;
