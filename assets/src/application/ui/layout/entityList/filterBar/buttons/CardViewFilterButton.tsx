import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { AppstoreFilled } from '@appDisplay/icons/svgs';
import { Button, ButtonSize } from '@application/ui/input';
import { CardViewFilterButtonProps } from '../types';

import { getPropsAreEqual } from '@appServices/utilities';

const CardViewFilterButton: React.FC<CardViewFilterButtonProps> = ({ listId, setCardView, view, ...rest }) => {
	const className = classNames('ee-filter-bar__btn');
	const filterId = `ee-card-view-btn-${listId}`;

	return (
		<Button
			active={view === 'card'}
			buttonSize={ButtonSize.SMALL}
			className={className}
			icon={AppstoreFilled}
			id={filterId}
			onClick={view !== 'card' ? setCardView : null}
			labelClassName={'ee-filter-bar__btn-wrap'}
			{...rest}
		>
			{__('card view')}
		</Button>
	);
};

export default React.memo(CardViewFilterButton, getPropsAreEqual(['listId'], ['view']));
