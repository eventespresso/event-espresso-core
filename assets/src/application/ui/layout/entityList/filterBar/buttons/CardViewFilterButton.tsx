import React from 'react';
import classNames from 'classnames';
import { AppstoreFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { CardViewFilterButtonProps } from '../types';
import { EspressoButton, EspressoButtonType } from '@application/ui/input';
import { LabelPosition } from '@application/ui/display';

const CardViewFilterButton: React.FC<CardViewFilterButtonProps> = React.memo(({ listId, setCardView, view }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': view === 'card' });
	const filterId = `ee-card-view-btn-${listId}`;

	return (
		<EspressoButton
			buttonType={EspressoButtonType.MINIMAL}
			className={className}
			disabled={view === 'card'}
			icon={<AppstoreFilled />}
			id={filterId}
			label={__('card view')}
			onClick={setCardView}
			tooltip={__('card view')}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM_CENTER}
		/>
	);
});

export default CardViewFilterButton;
