import React from 'react';
import { __ } from '@wordpress/i18n';

import { Button } from '@application/ui/input';
import { TableView } from '@appDisplay/icons/svgs';
import { TableViewFilterButtonProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const TableViewFilterButton: React.FC<TableViewFilterButtonProps> = ({ listId, setTableView, view, ...rest }) => {
	const filterId = `ee-table-view-btn-${listId}`;

	return (
		<Button
			active={view === 'table'}
			className='ee-filter-bar__btn'
			icon={TableView}
			id={filterId}
			onClick={view !== 'table' ? setTableView : null}
			labelClassName={'ee-filter-bar__btn-wrap'}
			{...rest}
		>
			{__('table view')}
		</Button>
	);
};

export default React.memo(TableViewFilterButton, getPropsAreEqual(['listId'], ['view']));
