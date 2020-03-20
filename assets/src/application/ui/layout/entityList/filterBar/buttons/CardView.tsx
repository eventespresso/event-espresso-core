import React from 'react';
import classNames from 'classnames';
import { AppstoreFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { EspressoButton, EspressoButtonType } from '@application/ui/input';
import FilterButtonWrap from './FilterButtonWrap';
import { CardViewFilterButtonProps } from '../types';

const CardViewFilterButton: React.FC<CardViewFilterButtonProps> = ({ listId, setCardView, view }) =>
	React.useMemo(() => {
		const className = classNames('ee-filter-bar-filter-btn', { 'ee-active-filters': view === 'card' });
		const filterId = `ee-card-view-btn-${listId}`;

		return (
			<FilterButtonWrap id={filterId} label={__('card view')}>
				<EspressoButton
					buttonType={EspressoButtonType.MINIMAL}
					className={className}
					icon={<AppstoreFilled />}
					id={filterId}
					onClick={setCardView}
					tooltip={__('card view')}
				/>
			</FilterButtonWrap>
		);
	}, [listId, setCardView, view]);

export default CardViewFilterButton;
