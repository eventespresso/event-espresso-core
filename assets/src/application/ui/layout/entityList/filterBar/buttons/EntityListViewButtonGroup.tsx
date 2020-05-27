import React from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonGroup, ButtonSize } from '@application/ui/input';
import CardViewFilterButton from './CardViewFilterButton';
import TableViewFilterButton from './TableViewFilterButton';
import { EntityListViewButtonGroupProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const EntityListViewButtonGroup: React.FC<EntityListViewButtonGroupProps> = ({
	listId,
	setCardView,
	setTableView,
	view,
}) => {
	return (
		<ButtonGroup buttonSize={ButtonSize.SMALL}>
			<TableViewFilterButton listId={listId} setTableView={setTableView} view={view} />
			<CardViewFilterButton listId={listId} setCardView={setCardView} view={view} />
		</ButtonGroup>
	);
};

export default React.memo(EntityListViewButtonGroup, getPropsAreEqual(['listId'], ['view']));
