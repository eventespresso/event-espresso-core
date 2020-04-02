import React from 'react';
import { format } from 'date-fns';

import DateRegistrationsLink from '@edtrUI/datetimes/DateRegistrationsLink';
import DateActionsMenu from '@edtrUI/datetimes/datesList/actionsMenu/DateActionsMenu';
import { Datetime } from '@edtrServices/apollo/types';
import { filterCellByStartOrEndDate } from '@sharedServices/filterState';
import { ENTITY_LIST_DATE_TIME_FORMAT } from '@appConstants/dateFnsFormats';
import { getBackgroundColorClassName, status } from '@sharedEntities/datetimes/helpers';
import { shortenGuid } from '@appServices/utilities/text';
import { BodyRowGeneratorFn } from '@appLayout/entityList';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';

import PriceAmountInput from '../../inputs/PriceAmountInput';
import PriceDescriptionInput from '../../inputs/PriceDescriptionInput';
import PriceIdInput from '../../inputs/PriceIdInput';
import PriceNameInput from '../../inputs/PriceNameInput';
import PriceModifierActions from '../../buttons/PriceModifierActions';
import PriceTypeInput from '../../inputs/PriceTypeInput';
import { PriceModifierProps } from '../../types';

import '@application/ui/styles/root/entity-status.css';

type DatesTableBodyRowGen = BodyRowGeneratorFn<Datetime, DatetimesFilterStateManager>;

/**
 * EditorDateEntityListItem
 * Displays Event Date as a table row similar to existing eventEntity editor UI
 */
const bodyRowGenerator: DatesTableBodyRowGen = ({ index, price }) => {
	const cells = [
		{
			key: 'id',
			type: 'cell',
			className: 'ee-ticket-price-calculator-price-id ee-number-column',
			value: <PriceIdInput price={price} />,
		},
		{
			key: 'type',
			type: 'cell',
			className: 'ee-ticket-price-calculator-price-type',
			value: <PriceTypeInput price={price} />,
		},
		{
			key: 'name',
			type: 'cell',
			className: 'ee-ticket-price-calculator-price-name',
			value: <PriceNameInput price={price} />,
		},
		{
			key: 'desc',
			type: 'cell',
			className: 'ee-ticket-price-calculator-price-desc',
			value: <PriceDescriptionInput price={price} />,
		},
		{
			key: 'amount',
			type: 'cell',
			className: 'ee-ticket-price-calculator-price-amount ee-number-column',
			value: <PriceAmountInput price={price} />,
		},
		{
			key: 'actions',
			type: 'cell',
			className: 'ee-ticket-price-calculator-price-actions',
			value: <PriceModifierActions index={index} price={price} />,
		},
	];

	return {
		cells,
		className: `ee-editor-date-list-view-row`,
		id: `ee-editor-date-list-view-row-${price.id}`,
		key: `row-${index}`,
		type: 'row',
	};
};

export default bodyRowGenerator;
