/**
 * External imports
 */
import { Fragment, useCallback } from '@wordpress/element';
import { normalizeEntityId } from '@eventespresso/helpers';
import { usePriceTypes } from '@eventespresso/hooks';
import { shortenCuid } from '@eventespresso/utils';

/**
 * Internal dependencies
 */
import {
	AddPriceModifierActionButton,
	DeletePriceModifierActionButton,
	PriceAmountInput,
	PriceDescriptionInput,
	PriceIdInput,
	PriceNameInput,
	PriceTypeInput,
} from '../price-modifier-row/';
import { getPriceType } from '../utils/';

/**
 * @param {string} ticketPrefix
 * @param {Object} values
 * @return {Object} rendered price modifier form row
 */
const useGeneratePriceModifierRow = ( ticketPrefix, values ) => {
	const { priceTypes } = usePriceTypes();
	return useCallback( ( ticket, price, priceTypeOptions, lastRow ) => {
		const priceId = shortenCuid( price.id );
		const prefix = `${ ticketPrefix }-price-${ priceId }`;
		const priceTypeId = normalizeEntityId( values[ `${ prefix }-type` ] ) || 0;
		const priceType = getPriceType( priceTypeId, priceTypes );
		return [
			{
				type: 'row',
				class: 'ee-ticket-price-calculator-price-row',
				value: '',
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-id ee-number-column',
				value: (
					<PriceIdInput
						prefix={ prefix }
						values={ values }
					/>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-type',
				value: (
					<PriceTypeInput
						price={ price }
						prefix={ prefix }
						values={ values }
						basePriceType={ priceType.pbtId }
						priceTypeOptions={ priceTypeOptions }
					/>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-name',
				value: (
					<PriceNameInput
						prefix={ prefix }
						values={ values }
						priceEntity={ price }
					/>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-desc',
				value: (
					<PriceDescriptionInput
						prefix={ prefix }
						values={ values }
						priceEntity={ price }
					/>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-amount ee-number-column',
				value: (
					<PriceAmountInput
						prefix={ prefix }
						values={ values }
						price={ price }
						priceType={ priceType }
						reverseCalculate={ ticket.reverseCalculate }
					/>
				),
			},
			{
				type: 'cell',
				class: 'ee-ticket-price-calculator-price-actions',
				value: (
					<Fragment>
						<DeletePriceModifierActionButton
							price={ price }
							ticket={ ticket }
							priceType={ priceType }
						/>
						<AddPriceModifierActionButton
							ticket={ ticket }
							lastRow={ lastRow }
							lastPrice={ price }
							priceTypes={ priceTypes }
						/>
					</Fragment>
				),
			},
		];
	}, [
		values,
		ticketPrefix,
	] );
};

export default useGeneratePriceModifierRow;
