import { useCallback } from 'react';
import classNames from 'classnames';
import { __ } from '@wordpress/i18n';

import { Cell } from '@appLayout/espressoTable';
import { getCurrencySignPositionClassName } from '@application/ui/input/priceTypeSign/utils';
import { HeaderRow } from '@appLayout/espressoTable';

type Props = {
	signB4: boolean;
};

type HeaderRowGenerator = (props: Props) => HeaderRow;

const useHeaderRowGenerator = (): HeaderRowGenerator => {
	return useCallback<HeaderRowGenerator>(({ signB4 }: Props) => {
		const position = getCurrencySignPositionClassName(signB4);

		const cells: Array<Cell> = [
			{
				key: 'id',
				type: 'cell',
				className: 'ee-ticket-price-calculator-id ee-number-column',
				value: __('ID', 'event_espresso'),
			},
			{
				key: 'type',
				type: 'cell',
				className: 'ee-ticket-price-calculator-type',
				value: __('Price Type', 'event_espresso'),
			},
			{
				key: 'name',
				type: 'cell',
				className: 'ee-ticket-price-calculator-name',
				value: __('Label', 'event_espresso'),
			},
			{
				key: 'desc',
				type: 'cell',
				className: 'ee-ticket-price-calculator-desc',
				value: __('Description', 'event_espresso'),
			},
			{
				key: 'amount',
				type: 'cell',
				className: classNames(position, 'ee-ticket-price-calculator-amount', 'ee-number-column'),
				value: __('Amount', 'event_espresso'),
			},
			{
				key: 'actions',
				type: 'cell',
				className: 'ee-ticket-price-calculator-actions',
				value: __('Actions', 'event_espresso'),
			},
		];

		return {
			cells,
			className: 'ee-editor-date-list-items-header-row',
			key: 'dates-list-header',
			primary: true,
			type: 'row',
		};
	}, []);
};

export default useHeaderRowGenerator;
