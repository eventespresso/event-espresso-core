import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType, Icon } from '@application/ui/input';
import { LabelPosition } from '@application/ui/display';
import { TableViewFilterButtonProps } from '../types';

const TableViewFilterButton: React.FC<TableViewFilterButtonProps> = React.memo(({ listId, setTableView, view }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': view === 'table' });
	const filterId = `ee-table-view-btn-${listId}`;

	return (
		<EspressoButton
			buttonType={EspressoButtonType.MINIMAL}
			className={className}
			icon={Icon.TABLE_VIEW}
			id={filterId}
			label={__('table view')}
			onClick={setTableView}
			tooltip={__('table view')}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM_CENTER}
		/>
	);
});

export default TableViewFilterButton;
