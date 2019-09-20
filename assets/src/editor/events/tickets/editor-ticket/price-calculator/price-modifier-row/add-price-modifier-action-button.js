/**
 * External imports
 */
import { IconButton, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { useAddPriceModifier } from '@eventespresso/hooks';
import { Money, SiteCurrency } from '@eventespresso/value-objects';
import PropTypes from 'prop-types';

import { getPriceType } from '../utils/';

const INITIAL_ORDER = 99;

const AddPriceModifierActionButton = ( {
	ticket,
	lastRow,
	lastPrice,
	priceTypes,
} ) => {
	const addPriceModifier = useAddPriceModifier();
	return useMemo( () => lastRow ? (
		<Tooltip
			position={ 'top left' }
			text={ __(
				'click to add price modifier',
				'event_espresso'
			) }
		>
			<IconButton
				aria-label={ __(
					'click to add price modifier',
					'event_espresso'
				) }
				icon="plus-alt"
				onClick={
					() => {
						// First let's change the initial order for
						// the last price to match its price type order.
						// Then the price order can be changed manually
						// if the user doesn't like the set default order
						if (
							parseInt( lastPrice.order, 10 ) === INITIAL_ORDER
						) {
							const priceType = getPriceType(
								lastPrice.PRT_ID,
								priceTypes
							);
							lastPrice.order = priceType.order;
						}
						addPriceModifier(
							ticket,
							{
								PRT_ID: 0,
								PRC_name: '',
								PRC_desc: '',
								PRC_amount: new Money( 0, SiteCurrency ),
								PRC_order: INITIAL_ORDER,
							}
						);
					}
				}
				className={ 'ee-add-price-modifier-btn' }
			/>
		</Tooltip>
	) : null,
	[ ticket.id, lastRow ]
	);
};

AddPriceModifierActionButton.propTypes = {
	ticket: PropTypes.object.isRequired,
	lastRow: PropTypes.bool,
	lastPrice: PropTypes.object.isRequired,
	priceTypes: PropTypes.arrayOf( PropTypes.object ).isRequired,
};

AddPriceModifierActionButton.defaultProps = {
	lastRow: false,
};

export default AddPriceModifierActionButton;
