/**
 * External imports
 */
import { Fragment, useMemo } from '@wordpress/element';
import { twoColumnAdminFormLayout } from '@eventespresso/components';
import { normalizeEntityId } from '@eventespresso/helpers';
import { __ } from '@eventespresso/i18n';
import { priceTypeModel } from '@eventespresso/model';

import useDefaultPriceType from '../hooks/use-default-price-type';

const { BASE_PRICE_TYPES } = priceTypeModel;
const { FormInput, InputLabel } = twoColumnAdminFormLayout;

/**
 * @param {BaseEntity} price
 * @param {string} prefix
 * @param {Object} values
 * @param {number} priceTypeId
 * @param {Array} priceTypeOptions
 * @param {number} basePriceType
 * @return {Object} rendered select input and label for setting price type
 */
const PriceTypeInput = ( {
	price,
	prefix,
	values,
	priceTypeId,
	priceTypeOptions,
	basePriceType,
} ) => {
	const defaultPriceType = useDefaultPriceType();
	return useMemo(
		() => (
			<Fragment>
				<InputLabel
					label={ __( 'Price Type', 'event_espresso' ) }
					htmlFor={ `${ prefix }-type` }
					htmlClass="ee-hidden-label"
				/>
				<FormInput
					key="type"
					type="select"
					name={ `${ prefix }-type` }
					value={
						normalizeEntityId( values[ `${ prefix }-type` ] ) || 0
					}
					options={ priceTypeOptions }
					htmlId={ `${ prefix }-type` }
					changeListener={
						( value, prev ) => {
							if ( value !== prev ) {
								price.PRT_ID = value ?
									normalizeEntityId( value ) :
									defaultPriceType.id;
							}
						}
					}
					disabled={ basePriceType === BASE_PRICE_TYPES.BASE_PRICE }
				/>
			</Fragment>
		),
		[ prefix, values[ `${ prefix }-type` ], priceTypeId, priceTypeOptions ]
	);
};

export default PriceTypeInput;
