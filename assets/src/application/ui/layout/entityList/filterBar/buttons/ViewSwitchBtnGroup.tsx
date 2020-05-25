import React from 'react';
import { __ } from '@wordpress/i18n';

import { ButtonGroup } from '@application/ui/input';
import CardViewFilterButton from './CardViewFilterButton';
import TableViewFilterButton from './TableViewFilterButton';
import { ViewSwitchBtnGroupProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const ViewSwitchBtnGroup: React.FC<ViewSwitchBtnGroupProps> = ({ listId, setCardView, setTableView, view }) => {
	return (
		<ButtonGroup>
			<TableViewFilterButton listId={listId} setTableView={setTableView} view={view} />
			<CardViewFilterButton listId={listId} setCardView={setCardView} view={view} />
		</ButtonGroup>
	);
};

export default React.memo(ViewSwitchBtnGroup, getPropsAreEqual(['listId'], ['view']));
