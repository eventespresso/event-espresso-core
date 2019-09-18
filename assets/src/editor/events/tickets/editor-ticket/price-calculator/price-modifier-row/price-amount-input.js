/**
 * External imports
 */
import { Fragment, useMemo } from '@wordpress/element';
import {
	usePriceTypeHtmlClass,
	PriceTypeSign,
	twoColumnAdminFormLayout,
} from '@eventespresso/components';
import { amountsMatch, parseMoneyValue } from '@eventespresso/utils';
import { __ } from '@eventespresso/i18n';
import { priceTypeModel } from '@eventespresso/model';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

const { BASE_PRICE_TYPES } = priceTypeModel;
const { FormInput, InputLabel } = twoColumnAdminFormLayout;

/**
 * @param {string} prefix
 * @param {Object} values
 * @param {BaseEntity} priceEntity
 * @param {BaseEntity} priceTypeEntity
 * @param {BaseEntity} ticketEntity
 * @return {Object} rendered text input and label for setting price amount
 */
const PriceAmountInput = ( {
	prefix,
	values,
	priceEntity,
	priceTypeEntity,
	ticketEntity,
} ) => {
	const key = `${ prefix }-amount`;
	const priceTypeHtmlClass = usePriceTypeHtmlClass( priceTypeEntity );
	return useMemo( () => (
		<Fragment>
			<InputLabel
				label={ __( 'Amount', 'event_espresso' ) }
				htmlFor={ key }
				htmlClass="ee-hidden-label"
			/>
			<PriceTypeSign priceType={ priceTypeEntity } />
			<FormInput
				key="price"
				type="text"
				name={ key }
				htmlId={ key }
				htmlClass={ priceTypeHtmlClass }
				value={
					priceEntity.amount.formatter.formatNumber(
						parseMoneyValue( values[ key ] || 0 )
					)
				}
				changeListener={
					( value, prev ) => {
						if ( ! amountsMatch( value, prev ) ) {
							priceEntity.amount = new Money(
								parseMoneyValue( value ),
								SiteCurrency
							);
						}
					}
				}
				disabled={
					priceEntity.prtId === BASE_PRICE_TYPES.BASE_PRICE &&
					ticketEntity.reverseCalculate === true
				}
				format={ ( value ) => {
					return priceEntity.amount.formatter.formatNumber(
						parseMoneyValue( value )
					);
				} }
				formatOnBlur
			/>
		</Fragment>
	), [
		prefix,
		values[ `${ prefix }-name` ],
		priceEntity.prtId,
		priceEntity.amount.toNumber(),
		priceTypeEntity.isPercent,
		ticketEntity.reverseCalculate,
	] );
};

export default PriceAmountInput;
