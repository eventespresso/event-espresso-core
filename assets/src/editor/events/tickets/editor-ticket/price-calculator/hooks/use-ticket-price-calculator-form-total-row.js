/**
 * External imports
 */
import { Fragment } from '@wordpress/element';
import { Tooltip } from '@wordpress/components';
import { __ } from '@eventespresso/i18n';
import {
	usePriceTypeHtmlClass,
	CurrencySign,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { Money, SiteCurrency } from '@eventespresso/value-objects';
import { amountsMatch, parseMoneyValue } from '@eventespresso/utils';

const {
	FormInput,
	InputLabel,
} = twoColumnAdminFormLayout;

/**
 * @function
 * @param {Object} ticket
 * @param {string} ticketPrefix
 * @param {Object} values form data
 * @param {Function} updateField
 * @return {Object} rendered form footer
 */
const useTicketPriceCalculatorFormTotalRow = (
	ticket,
	ticketPrefix,
	values,
	updateField,
) => {
	const calcDirIcon = ticket.reverseCalculate ? 'up' : 'down';
	const calcDirText = ticket.reverseCalculate ?
		__( 'reverse calculate base price from total', 'event_espresso' ) :
		__( 'calculate total from base price', 'event_espresso' );
	return {
		key: 'price-total-row',
		type: 'row',
		class: 'ee-ticket-price-calculator-total-row',
		cells: [
			{
				key: 'id',
				type: 'cell',
				class: '',
				value: '',
			},
			{
				key: 'type',
				type: 'cell',
				class: '',
				value: '',
			},
			{
				key: 'name',
				type: 'cell',
				class: '',
				value: '',
			},
			{
				key: 'desc',
				type: 'cell',
				class: 'ee-ticket-price-calculator-total-label' +
					' ee-number-column',
				value: (
					<InputLabel
						label={ __( 'Total', 'event_espresso' ) }
						htmlFor={ `${ ticketPrefix }-total` }
					/>
				),
			},
			{
				key: 'amount',
				type: 'cell',
				class: 'ee-ticket-price-calculator-total ee-number-column',
				value: (
					<Fragment>
						<CurrencySign />
						<FormInput
							key="total"
							type="text"
							name="ticketTotal"
							htmlId="ticketTotal"
							htmlClass={ usePriceTypeHtmlClass() }
							value={
								ticket.price.formatter.formatNumber(
									parseMoneyValue( values.ticketTotal )
								)
							}
							changeListener={
								( value, prev ) => {
									if ( ! amountsMatch( value, prev ) ) {
										ticket.price = new Money(
											parseMoneyValue( value ),
											SiteCurrency
										);
									}
								}
							}
							disabled={ ticket.reverseCalculate === false }
							format={ ( value ) => {
								return ticket.price.formatter.formatNumber(
									parseMoneyValue( value )
								);
							} }
							formatOnBlur
						/>
					</Fragment>
				),
			},
			{
				key: 'actions',
				type: 'cell',
				class: 'ee-ticket-price-calculator-total-actions',
				value: (
					<Tooltip text={ calcDirText } position={ 'top left' }>
						<FormInput
							type="iconButton"
							name="reverseCalculate"
							htmlId="reverseCalculate"
							value={ !! ticket.reverseCalculate }
							icon={ `arrow-${ calcDirIcon }-alt2` }
							helpText={ calcDirText }
							onClick={
								() => {
									const value = ! ticket.reverseCalculate;
									ticket.reverseCalculate = value;
									updateField( 'reverseCalculate', value );
								}
							}
						/>
					</Tooltip>
				),
			},
		],
	};
};

export default useTicketPriceCalculatorFormTotalRow;
