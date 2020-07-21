import React from 'react';
import classNames from 'classnames';

import { Content, Row, Sidebar } from '../Container';
import EntityPaperFrame from '../EntityPaperFrame';
import { EntityCardProps } from './types';
import { getPropsAreEqual } from '@appServices/utilities';
import './styles.scss';

const EntityCard: React.FC<EntityCardProps> = ({
	actionsMenu,
	cacheId,
	details,
	entity,
	reverse = false,
	sidebar,
	sidebarClass,
}) => {
	const sidebarClassName = classNames(sidebarClass, 'entity-card__sidebar');
	return (
		<EntityPaperFrame cacheId={cacheId} className={'ee-entity-card-wrapper ee-fade-in'} entity={entity}>
			<Row align={'wide'} className={'entity-card'} reverse={reverse}>
				<Sidebar align={'wide'} before className={sidebarClassName}>
					{sidebar}
				</Sidebar>
				<Content className={'entity-card__details-wrapper'}>
					<Content align={'wide'} className={'entity-card__details'}>
						{details}
					</Content>
				</Content>
				<Sidebar className={'entity-card__menu'}>{actionsMenu}</Sidebar>
			</Row>
		</EntityPaperFrame>
	);
};

export default React.memo(EntityCard, getPropsAreEqual(['cacheId']));
