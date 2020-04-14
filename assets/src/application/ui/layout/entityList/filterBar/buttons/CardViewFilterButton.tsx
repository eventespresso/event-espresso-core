import React from 'react';
import classNames from 'classnames';
import { AppstoreFilled } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';

import { CardViewFilterButtonProps } from '../types';
import { IconButton } from '@application/ui/input';
import { LabelPosition } from '@application/ui/display';
import { getPropsAreEqual } from '@appServices/utilities';

const CardViewFilterButton: React.FC<CardViewFilterButtonProps> = ({ listId, setCardView, view }) => {
	const className = classNames('ee-filter-bar__btn', { 'ee-filter-bar__btn--active': view === 'card' });
	const filterId = `ee-card-view-btn-${listId}`;

	return (
		<IconButton
			className={className}
			icon={() => <AppstoreFilled />}
			id={filterId}
			label={__('card view')}
			onClick={view !== 'card' ? setCardView : null}
			tooltip={__('card view')}
			labelClassName={'ee-filter-bar__btn-wrap'}
			labelPosition={LabelPosition.BOTTOM_CENTER}
			variant='outline'
		/>
	);
};

export default React.memo(CardViewFilterButton, getPropsAreEqual(['listId'], ['view']));
