import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { TableView } from '@appDisplay/icons';
import { IconButton } from '@application/ui/input';
import { LabelPosition } from '@application/ui/display';
import { TableViewFilterButtonProps } from '../types';
import { getPropsAreEqual } from '@appServices/utilities';

const TableViewFilterButton: React.FC<TableViewFilterButtonProps> = React.memo(({ listId, setTableView, view }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': view === 'table' });
	const filterId = `ee-table-view-btn-${listId}`;

	return (
		<IconButton
			className={className}
			icon={TableView}
			id={filterId}
			label={__('table view')}
			onClick={view !== 'table' ? setTableView : null}
			tooltip={__('table view')}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM_CENTER}
			variant='outline'
		/>
	);
});

export default React.memo(TableViewFilterButton, getPropsAreEqual(['listId'], ['view']));
