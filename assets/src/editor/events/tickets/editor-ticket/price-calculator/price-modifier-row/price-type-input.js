/**
 * External imports
 */
import { Fragment, useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { normalizeEntityId } from '@eventespresso/helpers';
import { __ } from '@eventespresso/i18n';
import { priceTypeModel } from '@eventespresso/model';
import PropTypes from 'prop-types';

import useDefaultPriceType from '../hooks/use-default-price-type';

const { BASE_PRICE_TYPES } = priceTypeModel;
const { FormInput, InputLabel } = twoColumnAdminFormLayout;

/**
 * @param {BaseEntity} price
 * @param {string} prefix
 * @param {Object} values
 * @param {number} basePriceType
 * @param {Array} priceTypeOptions
 * @return {Object} rendered select input and label for setting price type
 */
const PriceTypeInput = ( {
	price,
	prefix,
	values,
	basePriceType,
	priceTypeOptions,
} ) => {
	const key = `${ prefix }-type`;
	const defaultPriceType = useDefaultPriceType();
	const isBasePriceType = basePriceType === BASE_PRICE_TYPES.BASE_PRICE;	

	return useMemo(
		() => (
			<Fragment>
				<InputLabel
					label={ __( 'Price Type', 'event_espresso' ) }
					htmlFor={ key }
					htmlClass="ee-hidden-label"
				/>
				<FormInput
					key="type"
					type="select"
					htmlClass={ isBasePriceType && 'ee-base-price-type' }
					name={ key }
					value={
						normalizeEntityId( values[ key ] ) || 0
					}
					options={ priceTypeOptions }
					htmlId={ key }
					changeListener={
						( value, prev ) => {
							if ( value !== prev ) {
								price.PRT_ID = value ?
									normalizeEntityId( value ) :
									defaultPriceType.id;
							}
						}
					}
					disabled={ isBasePriceType }
				/>
			</Fragment>
		),
		[
			prefix,
			price.id,
			price.order,
			price.PRT_ID,
			basePriceType,
			priceTypeOptions,
			values[ key ],
		]
	);
};

PriceTypeInput.propTypes = {
	price: PropTypes.object.isRequired,
	prefix: PropTypes.string.isRequired,
	values: PropTypes.object.isRequired,
	priceTypeOptions: PropTypes.array.isRequired,
	basePriceType: PropTypes.number.isRequired,
};

PriceTypeInput.defaultProps = {
	priceTypeOptions: [],
};

export default PriceTypeInput;
