/**
 * External imports
 */
import { IconButton, Tooltip } from '@wordpress/components';
import { useMemo } from '@wordpress/element';
import { __ } from '@eventespresso/i18n';
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal dependencies
 */
import useAddPriceModifier from '../../../../hooks/use-add-price-modifier';

const AddPriceModifierActionButton = ( { ticket, lastRow } ) => {
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
					() => addPriceModifier(
						ticket,
						{
							PRT_ID: 4,
							PRC_name: '',
							PRC_desc: '',
							PRC_amount: new Money( 0, SiteCurrency ),
							PRC_order: 99,
						}
					)
				}
				className={ 'ee-add-price-modifier-btn' }
			/>
		</Tooltip>
	) : null,
	[ ticket.id, lastRow ]
	);
};

export default AddPriceModifierActionButton;
