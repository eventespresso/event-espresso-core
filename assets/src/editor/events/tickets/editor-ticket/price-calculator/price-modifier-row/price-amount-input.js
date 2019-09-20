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
import PropTypes from 'prop-types';

const { BASE_PRICE_TYPES } = priceTypeModel;
const { FormInput, InputLabel } = twoColumnAdminFormLayout;

/**
 * @param {string} prefix
 * @param {Object} values
 * @param {BaseEntity} price
 * @param {BaseEntity} priceType
 * @param {boolean} reverseCalculate
 * @return {Object} rendered text input and label for setting price amount
 */
const PriceAmountInput = ( {
	prefix,
	values,
	price,
	priceType,
	reverseCalculate,
} ) => {
	const key = `${ prefix }-amount`;
	const priceTypeHtmlClass = usePriceTypeHtmlClass( priceType );
	return useMemo( () => (
		<Fragment>
			<InputLabel
				label={ __( 'Amount', 'event_espresso' ) }
				htmlFor={ key }
				htmlClass="ee-hidden-label"
			/>
			<PriceTypeSign priceType={ priceType } />
			<FormInput
				key="price"
				type="text"
				name={ key }
				htmlId={ key }
				htmlClass={ priceTypeHtmlClass }
				value={
					price.amount.formatter.formatNumber(
						parseMoneyValue( values[ key ] || 0 )
					)
				}
				changeListener={
					( value, prev ) => {
						if ( ! amountsMatch( value, prev ) ) {
							price.amount = new Money(
								parseMoneyValue( value ),
								SiteCurrency
							);
						}
					}
				}
				disabled={
					price.prtId === BASE_PRICE_TYPES.BASE_PRICE &&
					reverseCalculate === true
				}
				format={ ( value ) => {
					return price.amount.formatter.formatNumber(
						parseMoneyValue( value )
					);
				} }
				formatOnBlur
			/>
		</Fragment>
	), [
		prefix,
		values[ key ],
		price.prtId,
		price.amount.toNumber(),
		priceType.isPercent,
		reverseCalculate,
	] );
};

PriceAmountInput.propTypes = {
	prefix: PropTypes.string.isRequired,
	values: PropTypes.object.isRequired,
	price: PropTypes.object.isRequired,
	priceType: PropTypes.object.isRequired,
	reverseCalculate: PropTypes.bool,
};

export default PriceAmountInput;
