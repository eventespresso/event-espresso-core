import React from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { AppstoreFilled } from '@appDisplay/icons/svgs';
import { CardViewFilterButtonProps } from '../types';
import { IconButton } from '@application/ui/input';
import { LabelPosition } from '@application/ui/display';
import { getPropsAreEqual } from '@appServices/utilities';

const CardViewFilterButton: React.FC<CardViewFilterButtonProps> = ({ listId, setCardView, view, ...rest }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': view === 'card' });
	const filterId = `ee-card-view-btn-${listId}`;

	return (
		<IconButton
			className={ className }
			icon={ AppstoreFilled }
			id={ filterId }
			label={ __('card view') }
			onClick={ view !== 'card' ? setCardView : null }
			labelClassName={ 'ee-filter-bar__btn-wrap' }
			labelPosition={ LabelPosition.BOTTOM_CENTER }
			variant='outline'
			{ ...rest }
		/>
	);
};

export default React.memo(CardViewFilterButton, getPropsAreEqual(['listId'], ['view']));
